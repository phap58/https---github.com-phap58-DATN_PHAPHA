import src.router.scripts as s
import src.router.infomation as i
import subprocess


def stop_all_vm(room):
    try:
        list_pathvm = i.get_pathvm_by_room(room)
        for path in list_pathvm:
            path = '"' + path + '"'
            command = s.SCRIPT_CONNECT_TO_SERVER + s.PATH_VMRUN + "stop " + path
            subprocess.run(command, shell=True, stdout=subprocess.PIPE)
            print("Stopping VM: " + path)
    except subprocess.CalledProcessError as e:
        print("Error running command: " + e.cmd)
        print("Return code: " + str(e.returncode))


def stop_vm_by_path(path):
    try:
        path = '"' + path + '"'
        command = s.SCRIPT_CONNECT_TO_SERVER + s.PATH_VMRUN + "stop " + path
        subprocess.run(command, shell=True, stdout=subprocess.PIPE)
        return "Stopping VM: " + path
    except subprocess.CalledProcessError as e:
        print("Error running command: " + e.cmd)
        print("Return code: " + str(e.returncode))

def update_vm_by_id(path):
    try:
        path = '"' + path + '"'
        stop_vm_by_path(path)
        import time
        time.sleep(5)
        command = s.SCRIPT_CONNECT_TO_SERVER + s.PATH_VMRUN + "update " + path
        subprocess.run(command, check=True,shell=True)
        return "SC"
    except subprocess.CalledProcessError as e:
        print("Error running command: " + e.cmd)
        print("Return code: " + str(e.returncode))
        return "ER"