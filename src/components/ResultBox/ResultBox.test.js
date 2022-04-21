import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  const testCases = [
    { amount: 200, from: 'PLN', to: 'USD' },
    { amount: 40, from: 'PLN', to: 'USD' },
    { amount: 360, from: 'PLN', to: 'USD' },
    { amount: 420, from: 'PLN', to: 'USD' },
  ];

  for(const testObj of testCases) {
    it('should render proper info about conversion when PLN -> USD', () => {

      // render component
      render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);

      // find main div
      const output = screen.getByTestId('output');

      // chceck the content of main div
      expect(output).toHaveTextContent('PLN 100.00 = $28.57');

      // unmount component
      cleanup();
    });
  };
});  