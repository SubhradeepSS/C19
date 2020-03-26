from plyer import notification
import requests
from bs4 import BeautifulSoup
import time
from twilio.rest import Client


def notify(title, message):
    notification.notify(title=title, message=message,
                        app_icon="C:\\Users\HP\Desktop\Covid-19 Desktop Notification\icon.ico", timeout=10)


def get_data_from_url(url):
    return requests.get(url).text


def whatsapp_message(message):
    account_sid = ''
    account_auth_token = ''
    client = Client(account_sid, account_auth_token)
    client.messages.create(body=message, from_='whatsapp:+14155238886', to='whatsapp:')


if __name__ == "__main__":
    while True:
        HTML_data = get_data_from_url('https://www.mohfw.gov.in/')
        # print(HTML_data)
        soup = BeautifulSoup(HTML_data, 'html.parser')
        #   print(soup)
        data_str = ''
        for tr in soup.find_all('tbody')[7].find_all('tr'):
            data_str += tr.get_text()
        data_str = data_str[1:]
        data_list = data_str.split('\n\n')
        # statewise_info_list = []
        states = ['Bihar', 'Delhi', 'West Bengal']  # States for which notification is required
        for data in data_list[0:len(data_list) - 5]:
            statewise_info_list = data.split('\n')
            if statewise_info_list[1] in states:
                print(statewise_info_list)
                title = 'Covid19'
                message = f'State - {statewise_info_list[1]}\nConfirmed(Indian) - {statewise_info_list[2]} ; Confirmed(Foreign) - {statewise_info_list[3]} ; Cured - {statewise_info_list[4]} ; Death - {statewise_info_list[5]}'
                notify(title, message)
                whatsapp_message(message)
                time.sleep(2)

        time.sleep(3600)  # Notification after every 1 hour (3600 secs)
