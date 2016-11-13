import random

from firebase import firebase

### TAXI
# int pos_x, pos_y;
# int axis; --> str from axisList
# str direction;

axisList = ['Horizontal', 'Vertical']

# taxiList[i] = Taxi ID Tag
# NOTE: Taxis are automatically added to taxiList upon initialization
taxiList = []
taxiCoords = []

class Taxi:
    def __init__(self):
        self.pos_x = random.randint(1, 100)
        self.pos_y = random.randint(1, 100)

        coin = random.random()
        if(coin > 0.5):
            # HI = Vertical
            self.axis = 1
            if(self.pos_y < 100):
                self.direction = 'N'
            else:
                self.direction = 'S'
        else:
            # LO = Horizontal 
            self.axis = 0
            if(self.pos_x < 100):
                self.direction = 'E'
            else:
                self.direction = 'W'
                
        taxiList.append(self)
        taxiCoords.append([self.pos_x, self.pos_y])

    def info(self):
        print "(" + str(self.pos_x) + "," + str(self.pos_y) + ")"
        #print "Axis = " + axisList[self.axis] + "\nDirection = " + self.direction

def updatePos():
    # Vertical case first
    for i in range(0, (len(taxiList) - 1)):
        if(taxiList[i].axis):
            if((taxiList[i].direction == 'N') & (taxiList[i].pos_y < 100)):
                taxiList[i].pos_y += 1
            else:
                if((taxiList[i].direction == 'N') & (taxiList[i].pos_y == 100)):
                    taxiList[i].direction = 'S'
                    taxiList[i].pos_y -= 1
                else:
                    if((taxiList[i].direction == 'S') & (taxiList[i].pos_y > 0)):
                        taxiList[i].pos_y -= 1
                    else:
                        taxiList[i].pos_y += 1
                        taxiList[i].direction = 'N'
                
        # Horizontal case
        else:
            if((taxiList[i].direction == 'E') & (taxiList[i].pos_x < 100)):
                taxiList[i].pos_x += 1
            else:
                if((taxiList[i].direction == 'E') & (taxiList[i].pos_x == 100)):
                    taxiList[i].direction = 'W'
                    taxiList[i].pos_x -= 1
                else:
                    if((taxiList[i].direction == 'W') & (taxiList[i].pos_x > 0)):
                        taxiList[i].pos_x -= 1
                    else:
                        taxiList[i].pos_x += 1
                        taxiList[i].direction = 'E'

def displayCoords():
    for i in range(0, (len(taxiList) - 1)):
        taxiList[i].info()


for i in range(0, 100):
	Taxi()

'''
print "--------------"
print
a = Taxi()
a.info()
print "+++"
a.updatePos()
a.info()
print
print "---------------"

            


print "Starting Point (x, y):\t(" + str(pos_x) + "," + str(pos_y) + ")"
print "Axis = " + axisList[axis] + "\nDirection = " + direction

'''
