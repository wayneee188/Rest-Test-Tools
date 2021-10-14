
import http.server
import signal
import socketserver
import sys

PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler


def exit(signum, frame):
    print('quit server')
    sys.exit()


def signal_exit():
    # 输入ctrl+c退出程序
    signal.signal(signal.SIGINT, exit)
    signal.signal(signal.SIGTERM, exit)

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='./www', **kwargs)

def run_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("serving at http://localhost:8000/", PORT)
        signal_exit()
        httpd.serve_forever()


if __name__ == '__main__':
    try:
        server_port_str = input("请输入服务的端口号({PORT})：".format(PORT=PORT)) or PORT
        PORT = int(server_port_str) or PORT
        run_server()
    except KeyboardInterrupt:
        exit(1)
