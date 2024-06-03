import src.router.scripts as s
import subprocess
import src.router.infomation as i


def getSizeOfDisk(path):
    res = 0

    path = path[:-1] + 'd'  # Replacing the last character with 'd'
    path += "k"  # Appending 'k' to the string
    print("Path disk: " + path)

    path = '"' + path + '"'

    command = s.SCRIPT_CONNECT_TO_SERVER + " type " + path
    process = subprocess.run(command, shell=True, text=True, capture_output=True, check=True)
    file = process.stdout.splitlines()

    for line in file:
            print(line)
            if line.startswith('RW'):
                name = line.split(" ")
                value = int(name[1])
                res += value

    print(res)
    return round(res*512/(1024*1023*1024))

def get_list_config_by_path(path):
    try:
        diskSize = getSizeOfDisk(path)
        path = '"' + path + '"'
        print("2Path: " + path)
        datas = []
        datas.append(diskSize)
        command = s.SCRIPT_CONNECT_TO_SERVER + " type " + path
        process = subprocess.run(command, shell=True, text=True, capture_output=True, check=True)
        file = process.stdout.splitlines()
        for line in file:
            print(line)
            if line.startswith('displayName'):
                name, value = line.split(" = ", 1)
                value = value.strip().strip('"')
                datas.append(value)
            if line.startswith('memsize'):
                name, value = line.split(" = ", 1)
                value = value.strip().strip('"')
                value = int(float(value) / 1024)
                datas.append(str(value) + "GB")
            if line.startswith('numvcpus'):
                name, value = line.split(" = ", 1)
                value = value.strip().strip('"')
                datas.append(value)
            if line.startswith('ethernet0.generatedAddress'):
                name, value = line.split(" = ", 1)
                value = value.strip().strip('"')
                datas.append(value)
            if line.startswith('guestOS'):
                name, value = line.split(" = ", 1)
                value = value.strip().strip('"')
                datas.append(value)
        return datas
    except Exception as e:
        print(e)
        return "Error"
