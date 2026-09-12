### 🎨 Key Features

- Terminal-based customization for Remnawave Panel
- Ready-made theme presets with an interactive color palette
- Custom accent, background, surface colors and element rounding
- Optional subtle visual effects that automatically follow the selected theme
- Safe reset back to the original Remnawave appearance
- Keeps the official Remnawave frontend files untouched, so normal Panel updates can still be used

### 🚀 Installation

:::warning
Remnawave Customizer must be installed **only on the server where Remnawave Panel is running**. Root privileges are required.
:::

Clone the repository to a fixed location:

```bash
git clone https://github.com/bruhxax/remnawave-customizer.git ~/remnawave-customizer
cd ~/remnawave-customizer
```

Before running the installer, review it:

```bash
less install.sh
```

Then install Customizer:

```bash
sudo ./install.sh
```

Launch the interactive menu:

```bash
customizer
```

### 🔄 Updating

```bash
cd ~/remnawave-customizer
git pull
sudo ./install.sh --no-setup
```

Your theme settings are preserved during updates.

### 🧹 Full uninstall

```bash
cd ~/remnawave-customizer
sudo ./uninstall.sh --purge
```

This restores the original Remnawave appearance and removes Customizer settings and runtime files.

### 🔗 Links

- [GitHub Repository](https://github.com/bruhxax/remnawave-customizer)
