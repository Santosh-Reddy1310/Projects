class LoginSystem:
    def __init__(self):
        self.users = {}
        self.logged_users = set()
        self.mapping = {
            "a": "i", "b": "l", "c": "q", "d": "f", "e": "z", "f": "s",
            "g": "a", "h": "g", "i": "e", "j": "p", "k": "w", "l": "o",
            "m": "v", "n": "u", "o": "b", "p": "j", "q": "k", "r": "n",
            "s": "x", "t": "d", "u": "h", "v": "y", "w": "t", "x": "m",
            "y": "r", "z": "c"
        }

    def encrypt(self, password):
        return "".join(self.mapping.get(char, char) for char in password)

    def register(self):
        username = input("Enter a username: ").strip()
        password = input("Enter a password: ").strip()

        if username in self.users:
            print("User already exists")
        else:
            self.users[username] = self.encrypt(password)
            print("User registered successfully")

    def login(self):
        username = input("Enter your username: ").strip()
        password = input("Enter your password: ").strip()

        if username not in self.users:
            print("User isn't in the system")
        elif self.users[username] != self.encrypt(password):
            print("Password doesn't match")
        else:
            self.logged_users.add(username)
            print("User logged in successfully")

    def sign_out(self):
        username = input("Enter your username: ").strip()

        if username not in self.users:
            print("User is not in the system")
        elif username not in self.logged_users:
            print("User is not logged in")
        else:
            self.logged_users.remove(username)
            print("User signed out successfully")

    def start(self):
        while True:
            print("\n===== LOGIN SYSTEM MENU =====")
            print("1. Register")
            print("2. Login")
            print("3. Sign Out")
            print("4. Exit")
            choice = input("Enter your choice: ").strip()

            if choice == "1":
                self.register()
            elif choice == "2":
                self.login()
            elif choice == "3":
                self.sign_out()
            elif choice == "4":
                print("Exiting the system. Goodbye!")
                break
            else:
                print("Invalid choice. Please enter a number from 1 to 4.")

ls = LoginSystem()
ls.start()
