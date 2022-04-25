import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  const testCases = [ 200, 40, 360, 420 ]

  const testCasesLessThanZero = [ -200, -40, -360, -420 ]

  for(const testObj of testCases) {
    it('should render proper info about conversion when PLN -> USD', () => {

      // render component
      render(<ResultBox from="PLN" to="USD" amount={testObj} />);

      // find main div
      const output = screen.getByTestId('output');

      // chceck the content of main div
      expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj, 'PLN')} = ${formatAmountInCurrency(testObj/3.5, 'USD')}`.replace(/\u00a0/g, ' '));

      // unmount component
      cleanup();
    });
  };
  for(const testObj of testCases) {
    it('should render proper info about conversion when USD -> PLN', () => {

      // render component
      render(<ResultBox from="USD" to="PLN" amount={testObj} />);

      // find main div
      const output = screen.getByTestId('output');

      // chceck the content of main div
      expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj, 'USD')} = ${formatAmountInCurrency(testObj*3.5, 'PLN')}`.replace(/\u00a0/g, ' '));

      // unmount component
      cleanup();
    });
  }; 
  for(const testObj of testCases) {
    it('should render proper info about conversion when PLN -> PLN', () => {
      render(<ResultBox from="PLN" to="PLN" amount={testObj} />);

      const output = screen.getByTestId('output');

      expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj, 'PLN')} = ${formatAmountInCurrency(testObj, 'PLN')}`.replace(/\u00a0/g, ' '));

      cleanup();
    });
  };
  for(const testObj of testCases) {
    it('should render proper info about conversion when USD -> USD', () => {
      render(<ResultBox from="USD" to="USD" amount={testObj} />);

      const output = screen.getByTestId('output');

      expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj, 'USD')} = ${formatAmountInCurrency(testObj, 'USD')}`.replace(/\u00a0/g, ' '));

      cleanup();
    });
  }; 
  for(const testObj of testCasesLessThanZero) {
    it('should render proper info if value is less than zero', () => {
      render(<ResultBox from="PLN" to="USD" amount={testObj} />);

      const output = screen.getByTestId('output');

      expect(output).toHaveTextContent(`Wrong value...`);

      cleanup();
    });
  };
  for(const testObj of testCasesLessThanZero) {
    it('should render proper info if value is less than zero', () => {
      render(<ResultBox from="USD" to="PLN" amount={testObj} />);

      const output = screen.getByTestId('output');

      expect(output).toHaveTextContent(`Wrong value...`);

      cleanup();
    });
  };
});  