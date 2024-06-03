from flask import Flask, render_template, request, send_from_directory
import src.remote.restart as rt
import src.remote.stop as st
import src.remote.update as up
import src.remote.config as config
import src.remote.program as pr
import src.remote.scan as sc

app = Flask(__name__, template_folder='template')


@app.route('/')
def index():
    return render_template('scanner.html')


@app.route('/forms')
def forms():
    return render_template('forms.html')


@app.route('/manager')
def manager():
    return render_template('manager.html')


@app.route('/details')
def details():
    return render_template('details.html')


@app.route('/src/data/<path:path>', methods=['GET'])
def get_data(path):
    return send_from_directory('src/data', path)


@app.route('/src/remote/restart.py', methods=['PUT'])
def restart():
    path = request.json['path']
    return rt.restart_vm_by_id(path)

@app.route('/src/remote/stop.py', methods=['PUT'])
def stop():
    path = request.json['path']
    return st.stop_vm_by_id(path)


@app.route('/src/remote/update.py', methods=['PUT'])
def sleep():
    path = request.json['path']
    return up.update_vm_by_id(path)


@app.route('/src/remote/config.py', methods=['PUT'])
def configs():
    path = request.json['path']
    return config.get_list_config_by_path(path)
    # return ['SC', 'SC', 'SC', 'SC', 'SC']

@app.route('/src/remote/run_check_internet', methods=['PUT'])
def pingToUrl():
    pr.run_check_internet()
    return "ok"
    # return ['SC', 'SC', 'SC', 'SC', 'SC']

@app.route('/src/remote/scan.py', methods=['PUT'])
def scans():
    path = request.json['path']
    return sc.scan_ip_vm_by_id(path)

if __name__ == '__main__':
    app.run(debug=True)
