# Lottie and Rive in React Native

This project demonstrates how to implement and use both Lottie and Rive animations in a React Native application. It includes examples for basic playback, interactive controls, and state updates.

## Features

- **Lottie Animation**:
  - Basic playback of JSON animations.
  - Controls: Play, Pause, Resume, Reset.
  - Loop toggle.
  - Speed control (0.1x to 3.0x).
- **Rive Animation**:
  - Playback of Rive files (from public URL).
  - State Machine interaction.
  - Play/Pause controls.

## Comparison: Lottie vs Rive

| Feature             | Lottie                                      | Rive                                     |
| :------------------ | :------------------------------------------ | :--------------------------------------- |
| **Format**          | JSON (Exported from After Effects)          | Binary `.riv` (Built in Rive Editor)     |
| **File Size**       | Generally larger (depends on complexity)    | Typically smaller (vector-based runtime) |
| **Performance**     | Good, but can be heavy with complex vectors | Excellent, optimized runtime             |
| **Interactivity**   | Limited (Play, Pause, Speed, Markers)       | High (State Machines, Triggers, Inputs)  |
| **Workflow**        | After Effects -> Bodymovin -> JSON          | Rive Editor -> .riv                      |
| **Runtime Control** | Manipulate progress, speed                  | Manipulate state machine inputs          |

## Usage

1. **Install Dependencies**:

   ```sh
   npm install
   ```

2. **Run on Android**:

   ```sh
   npm run android
   ```

3. **Explore**:
   - Use the main menu to select "Lottie Examples" or "Rive Examples".
   - Interact with the controls on each screen.

## Project Structure

- `App.tsx`: Main entry point with navigation.
- `components/LottieScreen.tsx`: Lottie implementation.
- `components/RiveScreen.tsx`: Rive implementation.
- `assets/lottie`: Local Lottie JSON files.

## Lottie Guidelines & Best Practices

To ensure smooth animations and optimal performance with Lottie in React Native, follow these guidelines:

### 1. Feature Support

Not all After Effects features are supported by Lottie.

- **Avoid**: Expressions, Effects (Gaussian Blur, Drop Shadow), specialized mattes (Alpha Inverted), and layer blending modes other than Normal.
- **Use**: Shapes, Keyframes on Transform properties (Position, Scale, Rotation, Opacity), and simple masks.
- **Check**: Use the [LottieFiles Preview](https://lottiefiles.com/preview) to verify your JSON before implementing.

### 2. Performance Optimization Techniques

- **Simplify Vectors**: Reduce the number of path points and groups in After Effects. Complicated vector paths increase CPU usage.
- **Pre-composition**: Flatten pre-comps where possible or keep them simple. Deeply nested pre-comps can impact performance.
- **Image Assets**: If your animation uses raster images, ensure they are optimized (compressed) and properly linked. Prefer vectors for resolution independence.
- **Render Mode**:
  - On Android, `lottie-react-native` often defaults to hardware acceleration.
  - If you experience crashes or rendering artifacts, try disabling hardware acceleration on the view or simplifying the animation.
- **Memory Management**: Unmount the `LottieView` when not in use or off-screen to free up resources.

### 3. File Size

- **Compression**: Use [dotLottie](https://dotlottie.io/) format if file size is a concern. It compresses the JSON and assets into a single file.
- **Gzip**: Lottie JSON files compress very well with Gzip/Brotli for network transfer.
