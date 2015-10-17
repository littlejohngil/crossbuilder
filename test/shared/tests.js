import webdriver from 'selenium-webdriver';
import expect from 'expect';

function selectXPath(child, value, container, className) {
  return webdriver.By.xpath(
    '//' + container + '[' + (className ? '@class="' + className + '" and ' : '') + './/span[text()="Clicked: "] and .//span[text()="' + value + '"] and .//span[text()=" times"]]' + child
  );
}

export function hasValue(value, container = 'p', className) {
  it('should contain text "Clicked: ' + value + ' times"', function(done) {
    this.driver.findElements(selectXPath('', value, container, className))
      .then((elems) => {
        expect(elems.length).toBe(1);
        done();
      });
  });
}
export function hasValueWait(value, container = 'p', className) {
  it('should contain text "Clicked: ' + value + ' times"', function(done) {
    this.timeout(5000);
    this.driver.wait(() =>
      this.driver.findElements(selectXPath('', value, container, className))
        .then((elems) => elems.length === 1)
      , 4000, 'element with such value doesn\'t exist')
      .then(() => done());
  });
}

export function hasClickedButton(idx, initialValue, finalValue, container = 'p', className) {
  it('should click button with idx=' + idx, function(done) {
    this.driver.findElement(selectXPath('//button[' + idx + ']', initialValue, container, className))
      .click().then(() => done());
  });
  hasValueWait(finalValue, container, className);
}

export function clickButtons(initialValue, container = 'p', className) {
  [
    [ 1, initialValue, initialValue + 1 ],
    [ 3, initialValue + 1, initialValue + 2 ],
    [ 4, initialValue + 2, initialValue + 3 ],
    [ 5, initialValue + 3, initialValue + 4 ],
    [ 2, initialValue + 4, initialValue + 3 ]
  ].forEach((params) => {
    hasClickedButton(...params, container, className);
  });
}

export function hasTitle(value) {
  it('should have title ' + value, function(done) {
    this.driver.getTitle().then((title) => {
      expect(title).toBe(value);
      done();
    });
  });
}