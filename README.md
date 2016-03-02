# gladys-onkyo
Controlling Onkyo AVR through Gladys project

##Installation
```bash
# Go to the hooks directory
$ cd gladys/api/hooks

# Clone the repository
$ git clone https://github.com/emilienmartinez/gladys-onkyo.git onkyo
$ cd onkyo

# Install python onkyo-eiscp (https://github.com/miracle2k/onkyo-eiscp)
$ easy_install onkyo-eiscp

# Install NPM dependencies
$ npm install

# Set the configuration informations
# avrIp -> Ip of Avr
# isHdmiInput -> raspberry pi connected through Hdmi to AVR
# hdmiInputCode -> input where raspberry is connected

$ nano lib/defaults.js

# Restart Gladys
$ sudo pm2 restart gladys
```

##Scenario actions
* send - Send given command
* startAvr - Power on AVR
* stopAvr - Power off AVR
* isAvrOn - Get power status of AVR
* getCurrentInput - Get the selected input of AVR
