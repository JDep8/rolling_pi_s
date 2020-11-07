import random
import RPi.GPIO as GPIO
import sqlite3
import time

#initialise GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(21, GPIO.OUT) #Low
GPIO.setup(18, GPIO.OUT) #Level 1
GPIO.setup(17, GPIO.OUT) #Level 2
GPIO.setup(27, GPIO.OUT) #Level 3
GPIO.setup(22, GPIO.OUT) #Level 4


#sensorVariable
sensorID = 1

#Change variance we want to record
changeVar = 3

#Frequency to update
secToUpdate = 5

#connect to our DB
connection = sqlite3.connect('/home/pi/Documents/CyberTankDB/CyberTank')
cursor = connection.cursor()

#update DB with new level
def updateDB():
   #this would be the code reding in the sensor data
   #For testing we are using a random num generator as the water tank level
    currentLevel = random.randint (0 , 100)
    
   #get previous level
    cursor.execute("SELECT level FROM tankLevel WHERE no = (SELECT MAX(no)  FROM tankLevel )")
    value  = cursor.fetchall()
    previousLevel = int(value[0][0])
    
    var = currentLevel - previousLevel
    print('currentLevel: ' + str(currentLevel) + '%')
    
    if (var > changeVar or var < (changeVar * -1)):
        cursor.execute("INSERT INTO tankLevel(sensorID,level, datetime) values (" +str(sensorID)+"," + str(currentLevel) + ", datetime('now'))")
        connection.commit()
        
    
def updateLights():
     #get current level 
    cursor.execute("SELECT level FROM tankLevel WHERE no = (SELECT MAX(no)  FROM tankLevel )")
    value  = cursor.fetchall()
    level = int(value[0][0])
                                                                                                                                        
    #turn lights on according to level
    if level >= 80:
        GPIO.output(18,True)
        GPIO.output(17,True)
        GPIO.output(27,True)
        GPIO.output(22,True)
        GPIO.output(21,False)

    elif level >= 60:
        GPIO.output(18,True)
        GPIO.output(17,True)
        GPIO.output(27,True)
        GPIO.output(22,False)
        GPIO.output(21,False)


    elif level >= 40:
        GPIO.output(18,True)
        GPIO.output(17,True)
        GPIO.output(27,False)
        GPIO.output(22,False)
        GPIO.output(21,False)

    elif level >= 20:
        GPIO.output(18,True)
        GPIO.output(17,False)
        GPIO.output(27,False)
        GPIO.output(22,False)
        GPIO.output(21,False)

    else:
        GPIO.output(18,False)
        GPIO.output(17,False)
        GPIO.output(27,False)
        GPIO.output(22,False)
        
        #loop for flashinglight
        for x in range(secToUpdate):
            GPIO.output(21,False)
            time.sleep(0.5)
            GPIO.output(21,True)
            time.sleep(0.5)         
                    
        #we dont want to wait another period so we will call the funtions here
        updateDB()
        updateLights()
    
i = 0
while i < 1:
    
    updateDB()
    updateLights()
    time.sleep(secToUpdate)
     




