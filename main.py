deg = 0
servo = 0
cmd = ""
serial.set_baud_rate(BaudRate.BAUD_RATE115200)
serial.write_line("hello kibo")
basic.show_icon(IconNames.HEART)

def on_forever():
    global cmd, servo, deg
    cmd = serial.read_until(serial.delimiters(Delimiters.NEW_LINE))
    if len(cmd) != 2:
        serial.write_line("length: " + str(len(cmd)))
    else:
        servo = int(cmd[0])
        deg = Servo.char_code_at(cmd, 1)
        if servo >= 0 and servo < 9 and deg > 32 and deg < 150:
            Servo.servo(servo, deg)
basic.forever(on_forever)
