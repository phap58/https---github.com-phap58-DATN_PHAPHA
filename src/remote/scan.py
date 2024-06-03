import subprocess
import src.router.scripts as s


def scan_ip_vm_by_id(path):
    VM_USER, VM_PASSWORD = s.VM_USER, s.VM_PASSWORD
    VM_USER = '"' + VM_USER + '"'
    VM_PASSWORD = '"' + VM_PASSWORD + '"'
    path_computer = path
    path_computer = '"' + path_computer + '"'
    command = s.SCRIPT_CONNECT_TO_SERVER + " " + s.PATH_VMRUN + ' -gu ' + VM_USER + ' -gp ' + VM_PASSWORD + ' getGuestIPAddress ' + path_computer + ' -wait'
  
    try:
        myip = subprocess.run(command, shell=True, text=True, capture_output=True, check=True)
        return myip.stdout
    except subprocess.CalledProcessError as e:
        print("Error running command: " + e.cmd)
        print("Return code: " + str(e.returncode))
        return "None"