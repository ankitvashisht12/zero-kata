import socket
from _thread import start_new_thread
import sys

server = "192.168.0.13"
port = 5555

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
     s.bind((server, port))
except socket.error as e:
    print(str(e))

s.listen(2)
print("Waiting for Connection. Server Started.")

def threaded_client(conn):
    conn.send(str.encode("Connected."))
    reply = ""
    while True:
        try:
            data = conn.recv(2048)
            reply = data.decode("utf-8")

            if not data:
                print("Disconnected.")
                break

            else:
                print("Recieved : ", reply)
                print("Sending : ", reply)
                
            conn.sendall(str.encode(reply))
        except:
            break

    print("Lost Connection.")
    conn.close()


while True:
    conn, addr = s.accept()
    print("Connected to", addr)


    start_new_thread(threaded_client, (conn,)) 