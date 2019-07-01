
var Util = (function () {

  var init = function () {

    !function (doc, win) { //字体大小
      var docEl = win.document.documentElement;
      var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
      var refreshRem = function () {
        var clientWidth = win.innerWidth
          || doc.documentElement.clientWidth
          || doc.body.clientWidth;
        // console.log(clientWidth); 页面宽度
        if (!clientWidth) return;
        var fz;
        var width = clientWidth;
        var px;
        px = 16;
        fz = px * width / 375;
        docEl.style.fontSize = fz + 'px';
        //console.log(docEl.style.fontSize);
      };
      if (!doc.addEventListener) return;
      eventUntil.addEvent(win, resizeEvt, refreshRem, !1);
      eventUntil.addEvent(doc, 'DOMContentLoaded', refreshRem, !1);
      //自适应手机
      refreshRem();
    }(document, window);

    !function () {
      var search_rule = document.getElementsByClassName('search_rule')[0];
      //active切换
      eventUntil.addEvent(search_rule, 'click', funcType.toggleChange.bind(null, {
        el: 'p',
        cls: 'active',
        bind: search_rule.children
      }));

      //创建下拉菜单
      eventUntil.addEvent(search_rule, 'click', funcType.createMenu.bind(null, {
        el: document.getElementsByClassName('def_sort')[0],
        cls: 'menu_list',
        find: 'p',
        rule: {
          val: [1, 2, 3, 4],
          arr: ['综合排序', '信用排序', '价格从高到低', '价格从低到高']
        }
      }));

      //点击事件
      eventUntil.addEvent(document, 'click', function (e) {
        var ev = event || window.event || e,
          el = ev.srcElement || ev.target;
        var clsList = {
          back: '.menu_list.single_modal',
          exch: '.icon_toggle'
        }
        var back = funcType.getParent(el, clsList.back);
        var exch = funcType.getParent(el, clsList.exch);

        //样式切换
        if (exch && exch.code) {
          // style.className;
          var pan_list = document.getElementsByClassName('pan_list')[0];
          exch = exch.result;
          domCtrl.toggleClass(exch, 'active'); //添加hover
          var toggle = ['large', 'list_view']; //切换种类
          var idx = toggle.indexOf(exch.getAttribute('data-toggle'));
          var pre = toggle[idx]; //保存上一个class
          idx = (idx++ < toggle.length - 1) ? idx++ : 0;
          pan_list.setAttribute('data-toggle', toggle[idx]); //点击时切换toggle值
          var reg = new RegExp('\\s?' + pre);
          exch.setAttribute('data-toggle', toggle[idx]);
          pan_list.className = pan_list.className.replace(reg, ''); //移除上一个class
          domCtrl.toggleClass(pan_list, toggle[idx]); //切换class
        }

        //下拉菜单选中
        if (back) {
          var modal = document.getElementsByClassName('modal')[0];
          if (back.code) {
            domCtrl.addClass(modal, 'hide');
            domCtrl.addClass(document.querySelector(clsList.back), 'hide');
            var child = el.parentNode.children;
            for (var i = 0; i < child.length; i++) {
              domCtrl.removeClass(child[i], 'active');
            }
            domCtrl.addClass(el, 'active');
            document.getElementsByClassName('sort_rule')[0].previousSibling.nodeValue = el.innerHTML;
          } else {
            if (back[0]) {
              if (back[0].className == 'modal') {
                domCtrl.addClass(modal, 'hide');
                domCtrl.addClass(document.querySelector(clsList.back), 'hide');
              }
            }
          }
        }
      });
    }();
  }

  return {
    init: init
  }
})();

var funcType = (function () {
  /**
   * 
   * @param {Object} arg
   *   -- bind 子元素 
   *   -- elem 要校验的元素
   *   -- cls 要添加的样式
   */
  var d = document,
    ab = {
      gc: 'getElementsByClassName',
      cre: 'createElement',
      ap: 'append'
    },
    at = {
      cls: 'className'
    };

  var toggleChange = function (arg, e) {
    var child = arg.bind,
      elem = arg.el,
      cls = arg.cls;
    var ev = event || window.event || e,
      el = ev.srcElement || ev.target;
    // console.log(el);
    var reg = new RegExp('\\s?' + cls);
    var rest = funcType.getParent(el, elem);
    rest = rest.result;
    if (rest[at.cls].indexOf(cls) != -1) { //重复不操作
      return;
    }
    for (var i = 0; i < child.length; i++) {
      child[i][at.cls] = child[i][at.cls].replace(reg, '');
    }
    if (rest) {
      domCtrl.addClass(rest, cls);
    }
  }

  //兄弟元素选择器
  var siblings = function (el) {
    for (var i = 0; i < el.length; i++) {
      // console.log('');
    }
  }

  //为指定元素绑定
  var getParent = function (el, elem) {
    var elem;
    var result = [];
    if (elem.indexOf('.') == -1 && elem.indexOf('#') == -1) { //元素查询
      if (el.nodeName.toLowerCase() == elem) { //当前元素已经找到
        return { code: 1, result: el };
      }
      while (el.nodeName.toLowerCase() != elem) {
        result.push(el);
        el = el.parentNode;
        if (el.parentNode == null) {
          return { code: 1, result: el };
        }
        if (el.nodeName.toLowerCase() == elem) {
          result.push(el);
          return { code: 1, result: el };
        }
      }
    } else { //query查询
      if (d.querySelector(elem)) {
        elem = d.querySelector(elem);
        // console.log(elem);
        if (el[at.cls].indexOf(elem[at.cls]) != -1) { //当前元素已经找到
          return { code: 1, result: el };
        }
        while (el[at.cls].indexOf(elem[at.cls]) == -1) {
          result.push(el);
          el = el.parentNode;
          if (el[at.cls] == null) { return result; }
          if (el[at.cls] == elem[at.cls]) {
            result.push(el);
            return { code: 1, result: el };
          }
        }
      }
      return;
    }
  }

  //查找父元素  elem:当前查找元素  cls  父元素class
  var findClass = function (elem, cls) {
    if (!cls || !elem) { return; }
    var result = [];
    var pre = elem.parentNode;
    if (elem.className.indexOf(cls) != -1) { //当前元素已经找到
      return { code: 1, arr: elem };
    }
    if (pre) {
      while (pre.className.indexOf(cls) == -1) {
        result.push(pre);
        pre = pre.parentNode;
        if (!pre.className) { return; }
        if (pre.className.indexOf(cls) != -1) {
          result.push(pre);
          return { code: 1, arr: result };
        }
      }
      result.push(pre);
      return { code: 1, arr: result };
    }
  }

  //创建菜单
  var createMenu = function (param, e) {

    var ev = event || window.event || e,
      tar = ev.srcElement || ev.target;
    var el = param.el,
      cls = param.cls,
      find = param.find,
      rule = param.rule;
    var rect = el.getBoundingClientRect(),
      top = rect.top,
      het = rect.height;

    //无则创建有则生成
    var menu = d[ab.gc](cls);
    var rest = funcType.getParent(tar, find);
    rest = rest.result;
    var modal = d[ab.gc]('modal')[0];
    if (rest[at.cls].indexOf(el[at.cls]) != -1) { //不存在则生成
      if (menu.length == 0) {
        var div = d[ab.cre]('div'),
          ul = d[ab.cre]('ul');
        div[ab.ap](ul);
        div.style = 'position:absolute;top:' + (het + top) + 'px';
        div[at.cls] = cls + ' single_modal';
        var lis = d.createDocumentFragment();
        var arr = rule.arr,
          tit = rule.val;
        for (var i = 0; i < arr.length; i++) {
          var li = d[[ab.cre]]('li');
          li[ab.ap](d.createTextNode(arr[i]));
          li.setAttribute('data-val', tit[i]);
          lis[ab.ap](li);
        }
        ul[ab.ap](lis);
        d.body[ab.ap](div);
      } else {
        menu = d[ab.gc](cls)[0];
        domCtrl.toggleClass(menu, ' hide');
      }
      domCtrl.toggleClass(modal, ' hide');
    } else {
      menu = d[ab.gc](cls);
      menu.length > 0 && (menu = menu[0], domCtrl.addClass(modal, 'hide'),
        menu[at.cls] += menu[at.cls].indexOf('hide') != -1 ? '' : ' hide');
    }
  }

  var sortCoupon = function () {
    console.log('sortCoupon');
  }

  siblings.prototype = {
    addClass: function () {
      console.log("设置css样式");
      return this;
    }
  };
  // var myjq = new siblings();
  // myjq.css().css().show().hide();

  return {
    getParent: getParent,
    createMenu: createMenu,
    sortCoupon: sortCoupon,
    findClass: findClass,
    toggleChange: toggleChange
  }
})();

var domCtrl = (function () {

  var addClass = function (menu, cls) {
    menu.className += !menu.className ? cls : (menu.className.indexOf(cls) != -1) ? '' : ' ' + cls;
  }
  var removeClass = function (menu, cls) {
    var reg = new RegExp('\\s?' + cls, 'g');
    menu.className = menu.className && (menu.className.replace(reg, ''));
  }
  var toggleClass = function (menu, cls, bool) {
    if (menu.className.indexOf(cls) == -1) {
      menu.className += !menu.className ? '' : ' ' + cls;
    } else {
      var reg = new RegExp('\\s?' + cls, 'g');
      // console.log(menu.className);
      menu.className = menu.className.replace(reg, '');
    }
  }

  return {
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass
  }

})();

var eventUntil = (function () {

  var addEvent = function (element, type, handler, bool) {
    var bool = !bool ? !1 : !0;
    // console.log(bool);
    if (element.addEventListener) {
      element.addEventListener(type, handler, bool);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, function () {
        handler.call(element);
      });
    } else {
      element['on' + type] = handler;
    }
  }

  var removeEvent = function (element, type, hanlder) {
    if (element.removeEventListener) {
      element.removeEventListener(type, hanlder, !1);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, hanlder);
    } else {
      element['on' + type] = null;
    }
  }

  return {
    addEvent: addEvent,
    removeEvent: removeEvent
  }
})();



var CookieUtil = (function () {
  // 设置cookie
  var set = function (name, value, expires, domain, path, secure) {
    var cookieText = "";
    cookieText += encodeURIComponent(name) + "="
      + encodeURIComponent(value);
    if (expires instanceof Date) {
      cookieText += "; expires=" + expires.toGMTString();
    }
    if (path) {
      cookieText += "; path=" + path;
    }
    if (domain) {
      cookieText += "; domain=" + domain;
    }
    if (secure) {
      cookieText += "; secure";
    }
    document.cookie = cookieText;
  }
  // name=value; expires=expiration_time; path=domain_path;
  // domain=domain_name; secure
  // 获取cookie
  var get = function (name) {
    var cookie = document.cookie;
    cookie = cookie.split(';');
    for (var i = 0; i < cookie.length; i++) {
      var split = cookie[i].split('='), key = split[0].replace(/\s+/, ''), val = split[1];
      if (encodeURIComponent(name) == key) {
        return val;
      }
    }
  }
  // 删除cookie
  var unset = function (name, domain, path, secure) {
    this.set(name, "", Date(0), domain, path, secure);
  }

  return {
    set: set,
    get: get,
    unset: unset
  }
})();