input.onButtonPressed(Button.A, function () {
    serial.writeLine("PING")
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    cmd = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    if (cmd.length == 2) {
        servo = parseInt(cmd[0])
        deg = Servo.charCodeAt(cmd, 1)
        if (servo >= 0 && servo < 9 && deg > 32 && deg < 150) {
            Servo.Servo(servo, deg)
        }
    } else {
        if (cmd == "PING") {
            serial.writeLine("PONG")
        }
    }
})
let deg = 0
let servo = 0
let cmd = ""
serial.setBaudRate(BaudRate.BaudRate115200)
serial.writeLine("hello kibo")
basic.showIcon(IconNames.Heart)
Servo.Servo(0, 90)
