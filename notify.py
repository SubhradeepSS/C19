from plyer import notification


def notify(title, message):
    notification.notify(title=title, message=message,
                        app_icon="C:\\Users\HP\Desktop\Covid-19 Desktop Notification\icon.ico", timeout=10)
