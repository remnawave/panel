### Installation instructions

#### Clone repo and change dir

```bash
git clone https://github.com/iphizic/remna-playbook.git
cd remna-playbook
```

#### Now make Python .env:

```bash
python3 -m venv .env
```

#### Activate .env:

```bash
source .env/bin/activate
```

#### Install Ansible and requirements:

```bash
pip install -r requirements.txt
ansible-galaxy install -r requirements.yml
```

#### Make inventory and other vars

Make inventory like inventory.yml.example in inventory dir
In directory group_vars make all.yml like all.yml.example

#### `Optional` Make some user but not root

:::warning
To run this playbook, the GitHub username must match the username in all.yml
:::

```bash
ansible-playbook prepare-playbook.yml -u root -k
```

First question it is root password
Second question it is password for the created user

#### Run install Remnaware:

```bash
ansible-playbook playbook.yml -K
```
