import src.router.scripts as s
import src.router.infomation as i
import subprocess


def restart_all_vm():
    try:
        list_pathvm = i.get_pathvm_by_room()
        for path in list_pathvm:
            path = '"' + path + '"'
            command = s.SCRIPT_CONNECT_TO_SERVER + s.PATH_VMRUN + "reset " + path
            subprocess.run(command, shell=True, stdout=subprocess.PIPE)
            print("Restarting VM: " + path)
    except subprocess.CalledProcessError as e:
        print("Error running command: " + e.cmd)
        print("Return code: " + str(e.returncode))


def restart_vm_by_id(path):
    try:
        path = '"' + path + '"'
        command = s.SCRIPT_CONNECT_TO_SERVER + s.PATH_VMRUN + "reset " + path
        subprocess.run(command, shell=True, stdout=subprocess.PIPE)
        return "SC"
    except subprocess.CalledProcessError as e:
        print("Error running command: " + e.cmd)
        print("Return code: " + str(e.returncode))
        return "ER"
