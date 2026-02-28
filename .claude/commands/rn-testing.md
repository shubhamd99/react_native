# React Native Testing (Callstack — RNTL)

React Native Testing Library (`@testing-library/react-native`) is maintained by **Callstack**. Use these patterns for all testing in this repo.

## Setup

```bash
yarn add -D @testing-library/react-native @testing-library/jest-native jest jest-circus
# For hooks
yarn add -D @testing-library/react-hooks react-test-renderer
```

`jest.config.js`:
```js
module.exports = {
  preset: 'react-native',
  setupFilesAfterEach: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-reanimated)/)',
  ],
};
```

## Core Principles (Callstack RNTL philosophy)
1. **Test behavior, not implementation** — query by what the user sees, not internal state
2. **Prefer user-centric queries** in this order:
   - `getByRole` → `getByLabelText` → `getByPlaceholderText` → `getByText` → `getByTestId`
3. **Avoid `toMatchSnapshot()`** for logic tests — use explicit assertions
4. **Never test React internals** — no `instance()`, no `state()`, no direct prop access

## Query Cheatsheet

```tsx
import { render, screen, fireEvent, waitFor, userEvent } from '@testing-library/react-native';

// Render
const { getByRole, getByText, queryByTestId } = render(<MyComponent />);
// or use screen (recommended)
render(<MyComponent />);
screen.getByRole('button', { name: 'Submit' });

// Queries
screen.getByText('Hello');                    // exact match, throws if missing
screen.queryByText('Hello');                  // returns null if missing (use for assertions of absence)
screen.findByText('Hello');                   // async, returns promise
screen.getAllByRole('listitem');               // returns array

// Roles (map to accessibilityRole)
// 'button' | 'link' | 'header' | 'checkbox' | 'switch' | 'tab' | 'image' | 'text' | 'alert'
```

## Firing Events

```tsx
// Simple fire
fireEvent.press(screen.getByRole('button', { name: 'Submit' }));
fireEvent.changeText(screen.getByPlaceholderText('Email'), 'user@example.com');
fireEvent.scroll(screen.getByTestId('scroll-view'), {
  nativeEvent: { contentOffset: { y: 100 } },
});

// User Event (more realistic — use for interactions that require gesture simulation)
const user = userEvent.setup();
await user.press(screen.getByRole('button'));
await user.type(screen.getByPlaceholderText('Email'), 'user@example.com');
```

## Async Testing

```tsx
// Wait for element to appear
await waitFor(() => {
  expect(screen.getByText('Success')).toBeOnTheScreen();
});

// Wait for element to disappear
await waitFor(() => {
  expect(screen.queryByText('Loading...')).not.toBeOnTheScreen();
});

// Find (async query shorthand)
const element = await screen.findByText('Loaded Data');
```

## Component Test Example

```tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  it('shows validation error when email is empty', () => {
    render(<LoginForm onSubmit={jest.fn()} />);

    fireEvent.press(screen.getByRole('button', { name: 'Log In' }));

    expect(screen.getByText('Email is required')).toBeOnTheScreen();
  });

  it('calls onSubmit with credentials when form is valid', async () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'user@example.com');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'secret123');
    fireEvent.press(screen.getByRole('button', { name: 'Log In' }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'secret123',
    });
  });
});
```

## Hook Test Example

```tsx
import { renderHook, act } from '@testing-library/react-native';
import useCounter from '../useCounter';

describe('useCounter', () => {
  it('increments count', () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
```

## Mocking Navigation

```tsx
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
};

render(<MyScreen navigation={mockNavigation as any} route={{ params: {} } as any} />);
```

## Mocking Native Modules

```tsx
// jest/setup.ts or inline
jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn().mockImplementation(() => ({
    set: jest.fn(),
    getString: jest.fn().mockReturnValue(null),
    delete: jest.fn(),
  })),
}));
```

## jest-native Matchers (from @testing-library/jest-native)

```tsx
expect(element).toBeOnTheScreen();         // element is in the tree
expect(element).toBeVisible();             // not hidden
expect(element).toBeDisabled();
expect(element).toHaveTextContent('Hello');
expect(element).toHaveProp('value', 'foo');
expect(element).toHaveStyle({ color: 'red' });
```

## What NOT to do

```tsx
// BAD: testing implementation details
expect(component.state().isLoading).toBe(false);

// BAD: snapshot testing for logic
expect(render(<Form />).toJSON()).toMatchSnapshot();

// BAD: querying by index
screen.getAllByRole('button')[0]; // fragile

// GOOD: query by accessible name
screen.getByRole('button', { name: 'Submit' });
```

## File Naming
- `MyComponent.test.tsx` — co-located with component
- `useMyHook.test.ts` — co-located with hook
- `__tests__/` folder — acceptable for integration tests
