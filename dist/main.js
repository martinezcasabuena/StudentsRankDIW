(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _task = require('./task.js');

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * AttitudeTask class. Create a attitude task in order to be
 * assigned to an individual or group of students. This could be for
 * example , participative attitude at class. Point a good 
 * question in class. Be the first finishing some exercise ...
 * 
 * @constructor
 * @param {string} name - task name
 * @param {string} description - task description
 * @param {string} points - task points associated to that behaviour
 * @tutorial pointing-criteria
 */

var AttitudeTask = function (_Task) {
  _inherits(AttitudeTask, _Task);

  function AttitudeTask(name, description, points) {
    _classCallCheck(this, AttitudeTask);

    var _this = _possibleConstructorReturn(this, (AttitudeTask.__proto__ || Object.getPrototypeOf(AttitudeTask)).call(this, name, description));

    _this.points = points;
    return _this;
  }

  return AttitudeTask;
}(_task2.default);

exports.default = AttitudeTask;

},{"./task.js":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.context = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Context class. Devised to control every element involved in the app: students, gradedTasks ...
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @constructor
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @tutorial pointing-criteria
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

/*jshint -W061 */

var _person = require('./person.js');

var _person2 = _interopRequireDefault(_person);

var _gradedtask = require('./gradedtask.js');

var _gradedtask2 = _interopRequireDefault(_gradedtask);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Context = function () {
  function Context() {
    _classCallCheck(this, Context);

    this.students = [];
    this.gradedTasks = [];

    if (localStorage.getItem('students')) {
      var students_ = JSON.parse(localStorage.getItem('students'));
      for (var i = 0; i < students_.length; i++) {
        var p = new _person2.default(students_[i].name, students_[i].surname, students_[i].attitudeTasks, students_[i].gradedTasks);
        this.students.push(p);
      }
    }
    if (localStorage.getItem('gradedTasks')) {
      this.gradedTasks = JSON.parse(localStorage.getItem('gradedTasks'));
    }
  }
  /** Init nav bar menu and manipulate evetntlisteners to menu items */


  _createClass(Context, [{
    key: 'initMenu',
    value: function initMenu() {
      var _this = this;

      var addTask = document.getElementById('addGradedTask');
      addTask.addEventListener('click', function () {
        _this.addGradedTask();
      });
      var addStudent = document.getElementById('addStudent');
      addStudent.addEventListener('click', function () {
        _this.addPerson();
      });
    }

    /** Draw Students rank table in descendent order using points as a criteria */

  }, {
    key: 'getTemplateRanking',
    value: function getTemplateRanking() {

      if (this.students && this.students.length > 0) {
        /* We sort students descending from max number of points to min */
        this.students.sort(function (a, b) {
          return b.getTotalPoints() - a.getTotalPoints();
        });
        localStorage.setItem('students', JSON.stringify(this.students));
        var GRADED_TASKS = '';
        this.gradedTasks.forEach(function (taskItem) {
          GRADED_TASKS += '<td>' + taskItem.name + '</td>';
        });

        (0, _utils.loadTemplate)('templates/rankingList.html', function (responseText) {
          document.getElementById('content').innerHTML = eval('`' + responseText + '`');
          var tableBody = document.getElementById('idTableRankingBody');
          this.students.forEach(function (studentItem) {
            var liEl = studentItem.getHTMLView();
            tableBody.appendChild(liEl);
          });
        }.bind(this));
      }
    }

    /** Create a form to create a GradedTask that will be added to every student */

  }, {
    key: 'addGradedTask',
    value: function addGradedTask() {

      var callback = function (responseText) {
        var _this2 = this;

        var saveGradedTask = document.getElementById('newGradedTask');

        saveGradedTask.addEventListener('submit', function () {
          var name = document.getElementById('idTaskName').value;
          var description = document.getElementById('idTaskDescription').value;
          var weight = document.getElementById('idTaskWeight').value;
          var gtask = new _gradedtask2.default(name, description, weight);
          _this2.gradedTasks.push(gtask);
          localStorage.setItem('gradedTasks', JSON.stringify(_this2.gradedTasks));
          _this2.students.forEach(function (studentItem) {
            studentItem.addGradedTask(gtask);
          });
          _this2.getTemplateRanking();
        });
      }.bind(this);

      (0, _utils.loadTemplate)('templates/addGradedTask.html', callback);
    }
    /** Add a new person to the context app */

  }, {
    key: 'addPerson',
    value: function addPerson() {

      var callback = function (responseText) {
        var _this3 = this;

        var saveStudent = document.getElementById('newStudent');

        saveStudent.addEventListener('submit', function () {
          var name = document.getElementById('idFirstName').value;
          var surnames = document.getElementById('idSurnames').value;
          var student = new _person2.default(name, surnames, [], []);
          _this3.gradedTasks.forEach(function (iGradedTask) {
            student.addGradedTask(new _gradedtask2.default(iGradedTask.name));
          });
          _this3.students.push(student);
          localStorage.setItem('students', JSON.stringify(_this3.students));
        });
      }.bind(this);

      (0, _utils.loadTemplate)('templates/addStudent.html', callback);
    }
    /** Add last action performed to lower information layer in main app */

  }, {
    key: 'notify',
    value: function notify(text) {
      document.getElementById('notify').innerHTML = text;
    }
  }]);

  return Context;
}();

var context = exports.context = new Context(); //Singleton export

},{"./gradedtask.js":3,"./person.js":5,"./utils.js":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _task = require('./task.js');

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * GradedTask class. Create a graded task in order to be evaluated 
 * for every student engaged. Theory tests and procedure practices 
 * are part of this category.
 * @constructor
 * @param {string} name - task name
 * @tutorial pointing-criteria
 */

var GradedTask = function (_Task) {
  _inherits(GradedTask, _Task);

  function GradedTask(name, description, weight) {
    _classCallCheck(this, GradedTask);

    var _this = _possibleConstructorReturn(this, (GradedTask.__proto__ || Object.getPrototypeOf(GradedTask)).call(this, name, description));

    _this.weight = weight;
    return _this;
  }

  return GradedTask;
}(_task2.default);

exports.default = GradedTask;

},{"./task.js":6}],4:[function(require,module,exports){
'use strict';

var _context = require('./context.js');

/** Once the page is loaded we get a context app object an generate students rank view. */
window.onload = function () {
  _context.context.initMenu();
  _context.context.getTemplateRanking();
};

},{"./context.js":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Person class. We store personal information and attitudePoints that reflect daily classroom job
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @constructor
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {string} name - Person name
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {string} surname - Person surname
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {array} attitudeTasks - Person awarded AttitudeTasks array   
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {array} gradedTasks - Person gradedTasks array
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @tutorial pointing-criteria
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _utils = require('./utils.js');

var _context = require('./context.js');

var _attitudetask = require('./attitudetask.js');

var _attitudetask2 = _interopRequireDefault(_attitudetask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var privateAddTotalPoints = Symbol('privateAddTotalPoints'); /** To accomplish private method */
var _totalPoints = Symbol('TOTAL_POINTS'); /** To acomplish private property */

var Person = function () {
  function Person(name, surname, attitudeTasks, gradedTasks) {
    _classCallCheck(this, Person);

    this[_totalPoints] = 0;
    this.name = name;
    this.surname = surname;

    this.attitudeTasks = attitudeTasks;
    this.gradedTasks = gradedTasks;

    this.attitudeTasks.forEach(function (itemAT) {
      this[_totalPoints] += parseInt(itemAT['task'].points);
    }.bind(this));
    this.gradedTasks.forEach(function (itemGT) {
      this[_totalPoints] += parseInt(itemGT.points);
    }.bind(this));
  }

  /** Add points to persons we should carefully use it. */


  _createClass(Person, [{
    key: privateAddTotalPoints,
    value: function value(points) {
      if (!isNaN(points)) {
        this[_totalPoints] += points;
        _context.context.getTemplateRanking();
      }
    }

    /** Read person _totalPoints. A private property only modicable inside person instance */

  }, {
    key: 'getTotalPoints',
    value: function getTotalPoints() {
      return this[_totalPoints];
    }

    /** Add a gradded task linked to person with its own mark. */

  }, {
    key: 'addGradedTask',
    value: function addGradedTask(taskInstance) {
      this.gradedTasks.push({ 'task': taskInstance, 'points': 0 });
    }

    /** Add a Attitude task linked to person with its own mark. */

  }, {
    key: 'addAttitudeTask',
    value: function addAttitudeTask(taskInstance) {
      this.attitudeTasks.push({ 'task': taskInstance });
      this[privateAddTotalPoints](parseInt(taskInstance.points));
      _context.context.notify('Added ' + taskInstance.description + ' to ' + this.name + ',' + this.surname);
    }

    /** Renders HTML person view Create a table row (tr) with
     *  all name, attitudePoints , add button and one input for 
     * every gradded task binded for that person. */

  }, {
    key: 'getHTMLView',
    value: function getHTMLView() {
      var _this = this;

      var liEl = document.createElement('tr');

      var esEL = (0, _utils.getElementTd)(this.surname + ', ' + this.name);
      esEL.addEventListener('click', function () {
        (0, _utils.loadTemplate)('templates/detailStudent.html', function (responseText) {
          var STUDENT = this;
          var ATTITUDE_TASKS = '';
          this.attitudeTasks.reverse().forEach(function (atItem) {
            ATTITUDE_TASKS += '<li>' + atItem.task.points + '->' + atItem.task.description + '->' + (0, _utils.formatDate)(new Date(atItem.task.datetime)) + '</li>';
          });
          var GRADED_TASKS = '';
          this.gradedTasks.forEach(function (gtItem) {
            GRADED_TASKS += '<li>' + gtItem.points + '->' + gtItem.task.name + '->' + (0, _utils.formatDate)(new Date(gtItem.task.datetime)) + '</li>';
          });
          document.getElementById('content').innerHTML = eval('`' + responseText + '`');
        }.bind(_this));
      });

      liEl.appendChild(esEL);

      liEl.appendChild((0, _utils.getElementTd)(this[_totalPoints]));

      var addAttitudeTaskEl = document.createElement('button');
      addAttitudeTaskEl.className = 'button_attitude';
      var tb = document.createTextNode('+XP');
      addAttitudeTaskEl.appendChild(tb);

      liEl.appendChild((0, _utils.getElementTd)(addAttitudeTaskEl));

      addAttitudeTaskEl.addEventListener('click', function () {
        var popUp = (0, _utils.popupwindow)('templates/listAttitudeTasks.html', 'XP points to ' + _this.name, 300, 400);
        var personInstance = _this;
        popUp.onload = function () {
          popUp.document.title = personInstance.name + ' ' + personInstance.surname + ' XP points';
          var xpButtons = popUp.document.getElementsByClassName('xp');
          Array.prototype.forEach.call(xpButtons, function (xpBItem) {
            xpBItem.addEventListener('click', function () {
              popUp.close();
              personInstance.addAttitudeTask(new _attitudetask2.default('XP task', xpBItem.innerHTML, xpBItem.value));
            });
          });
        };
      });

      var that = this;

      this.gradedTasks.forEach(function (gTaskItem) {
        var inputEl = document.createElement('input');
        inputEl.type = 'number';
        inputEl.min = 0;
        inputEl.max = 100;
        inputEl.value = gTaskItem['points'];
        inputEl.addEventListener('change', function (event) {
          that[privateAddTotalPoints](parseInt(gTaskItem['points'] * -1));
          gTaskItem['points'] = inputEl.value;
          that[privateAddTotalPoints](parseInt(gTaskItem['points']));
        });
        liEl.appendChild((0, _utils.getElementTd)(inputEl));
      });

      return liEl;
    }
  }]);

  return Person;
}();

exports.default = Person;

},{"./attitudetask.js":1,"./context.js":2,"./utils.js":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Task class. Create a task in order to be evaluated for every student engaged. 
 * @constructor
 * @param {string} name - task name
 * @param {string} description - task description
 * @tutorial pointing-criteria
 */

var Task = function Task(name, description) {
  _classCallCheck(this, Task);

  this.name = name;
  this.description = description;
  this.datetime = new Date();
};

exports.default = Task;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Hash code funtion usefull for getting an unique id based on a large text */
function hashcode(str) {
  var hash = 0,
      i = void 0,
      chr = void 0;
  if (str.length === 0) {
    return hash;
  }
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

/** Pass a text or an element ang get a td table element wrapping it. */
function getElementTd(text) {
  var tdEl = document.createElement('td');
  var t = text;
  if (typeof text === 'string' || typeof text === 'number') {
    t = document.createTextNode(text); // Create a text node
  }
  tdEl.appendChild(t);
  return tdEl;
}

function deleteContent() {
  var contentEl = document.getElementById('content');

  while (contentEl.firstChild) {
    contentEl.removeChild(contentEl.firstChild);
  }
}

function loadTemplate(urlTemplate, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.getElementById('content').innerHTML = this.responseText;
      callback(this.responseText);
    }
  };
  xhttp.open('GET', urlTemplate, true);
  xhttp.send();
}

function popupwindow(url, title, w, h) {
  var left = screen.width / 2 - w / 2;
  var top = screen.height / 2 - h / 2;
  return window.open(url, title, 'toolbar=no, location=no, directories=no,' + 'status=no, menubar=no,scrollbars=no, resizable=no, copyhistory=no,' + ' width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}

function formatDate(date) {
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var minute = date.getMinutes();
  var hour = date.getHours();

  return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hour + ':' + minute;
}

exports.formatDate = formatDate;
exports.popupwindow = popupwindow;
exports.hashcode = hashcode;
exports.getElementTd = getElementTd;
exports.deleteContent = deleteContent;
exports.loadTemplate = loadTemplate;

},{}]},{},[4]);
