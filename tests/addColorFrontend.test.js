const fs = require('fs');
const path = require('path');
const vm = require('vm');

describe('addColor frontend unit test', () => {
  let context;
  let elements;
  let requests;

  beforeEach(() => {
    requests = [];
    elements = {
      colorText: { value: 'Cerulean' },
      colorAddResult: { innerHTML: 'Old message' }
    };

    class MockXMLHttpRequest {
      constructor() {
        this.headers = {};
        requests.push(this);
      }

      open(method, url, async) {
        this.method = method;
        this.url = url;
        this.async = async;
      }

      setRequestHeader(name, value) {
        this.headers[name] = value;
      }

      send(body) {
        this.body = body;
        this.readyState = 4;
        this.status = 200;
        this.responseText = JSON.stringify({ error: '' });

        if (typeof this.onreadystatechange === 'function') {
          this.onreadystatechange();
        }
      }
    }

    context = vm.createContext({
      window: {
        API_BASE_URL: 'http://127.0.0.1:8000',
        location: { hostname: 'localhost', href: '' }
      },
      document: {
        cookie: '',
        getElementById: jest.fn((id) => elements[id]),
        getElementsByTagName: jest.fn(() => [])
      },
      XMLHttpRequest: MockXMLHttpRequest,
      JSON,
      Date,
      parseInt,
      console
    });

    const scriptPath = path.join(__dirname, '../colors-lamp/public/js/code.js');
    const scriptContents = fs.readFileSync(scriptPath, 'utf8');

    vm.runInContext(scriptContents, context);
    vm.runInContext('userId = 12;', context);
  });

  test('posts the selected color and shows a success message', () => {
    context.addColor();

    expect(requests).toHaveLength(1);
    expect(requests[0].method).toBe('POST');
    expect(requests[0].url).toBe('http://127.0.0.1:8000/AddColor.php');
    expect(requests[0].async).toBe(true);
    expect(requests[0].headers['Content-type']).toBe('application/json; charset=UTF-8');
    expect(JSON.parse(requests[0].body)).toEqual({
      color: 'Cerulean',
      userId: 12
    });
    expect(elements.colorAddResult.innerHTML).toBe('Color has been added');
  });
});
