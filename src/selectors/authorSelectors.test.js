import expect from 'expect';
import { getFormattedAuthors } from './authorSelectors';

describe('Author Selectors', () => {
  describe('getFormattedAuthors', () => {
    it('should return formatted author data for use in a dropdown', () => {
      // Arrange
      const authors = [
        { id: '1', firstName: 'Gavin', lastName: 'Kirchner' },
        { id: '2', firstName: 'Someone', lastName: 'Else' }
      ]; 

      const expectedAuthors = [
        { value: '1', text: 'Gavin Kirchner' },
        { value: '2', text: 'Someone Else' }
      ];

      // Act
      const formattedAuthors = getFormattedAuthors(authors);

      // Assert 
      expect(formattedAuthors).toEqual(expectedAuthors);
    });
  });
});