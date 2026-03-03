# 🧮 Advanced JavaScript Calculator

A feature-rich, responsive calculator built with vanilla JavaScript that combines classic calculator functionality with modern enhancements like keyboard support, memory functions, and error handling.

## ✨ Features

### Core Calculator Functions

- **Basic Operations**: Addition, subtraction, multiplication, division, modulo
- **Decimal Support**: Proper decimal point handling with validation
- **Clear Functions**: AC (all clear) and backspace functionality

### Advanced Features

- **Keyboard Support**: Full keyboard navigation and shortcuts
- **Chain Operations**: Support for continuous calculations (e.g., 5 + 3 + 2 = 10)
- **Error Handling**: Graceful handling of division by zero and invalid inputs
- **Floating Point Precision**: Solves JavaScript floating point arithmetic issues

### User Experience

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Keyboard Shortcuts**: Alt combinations for quick access
- **Visual Feedback**: Clean, intuitive interface
- **State Management**: Intelligent input handling

## 🚀 Quick Start

### JavaScript Integration

Simply include the calculator.js file in your HTML and the calculator will automatically initialize.

## ⌨️ Keyboard Shortcuts

| Key                     | Function           |
| ----------------------- | ------------------ |
| `0-9`                   | Number input       |
| `+`, `-`, `*`, `/`, `%` | Operations         |
| `Enter` or `=`          | Calculate result   |
| `Escape` or `Delete`    | Clear all (AC)     |
| `Backspace`             | Delete last digit  |
| `Alt + m`               | Memory add (M+)    |
| `Alt + r`               | Memory recall (MR) |
| `Alt + c`               | Memory clear (MC)  |

## 📋 Usage Examples

### Basic Calculation

```
5 + 3 = 8
```

### Chain Operations

```
5 + 3 + 2 = 10
```

<!-- ### Memory Functions

```
5 M+        (store 5 in memory)
3 + MR = 8  (3 + 5 = 8)
```-->

### Decimal Operations

```
3.14 * 2 = 6.28
```

### Error Handling

```
5 / 0 = "Cannot divide by zero"
```

## 🔧 Technical Details

### State Management

- `afterOperation`: Tracks if calculator just completed a calculation
- `first_num`, `second_num`: Store operands
- `operator`: Stores current operation
<!-- - `memory`: Stores memory value -->

### Input Validation

- Prevents invalid decimal inputs (e.g., 3.14.15)
- Handles division by zero gracefully
- Validates numeric inputs before processing

### Floating Point Precision

```javascript
const formatNumber = (num) => {
  return parseFloat(num.toPrecision(12));
};
```

## 🎯 Customization

### Adding New Operations

```javascript
const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => (b === 0 ? null : a / b),
  "%": (a, b) => (b === 0 ? null : a % b),
  //   '**': (a, b) => a ** b  // Add power operation
};
```

## 🐛 Error Handling

The calculator handles these edge cases:

- Division by zero
- Modulo by zero
- Invalid numeric inputs
- Floating point precision issues
- Keyboard input validation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you found a bug or have a feature request, please [open an issue](https://www.github.com/mandalorian-0/odin-calc/issues).

---

**Made with ❤️ by Mandalorian**
