const menuApp = require('../js/menu');
const fs = require('fs');
const $ = require('jquery');
const mustache = require('mustache');

const list = [
  {
    'menuId': '001',
    menuName: 'Dealer Management',
    menuIcon: 'fa fa-list-alt',
    submenu: [
      {
        subMenuId: '001_01',
        subMenuName: 'Test1',
        subMenuHref: 'sub001_01',
      },
      {
        subMenuId: '001_02',
        'subMenuName': 'Test2',
        subMenuHref: 'sub001_02',
      },
    ],
  },
];

test('test get menu data', () => {
  expect.assertions(1);
  return menuApp($, mustache).service.getMenuData()
    .then((data) => {
      expect(data[0]).toMatchObject(list[0]);
    });
});

test('test process menu data', () => {
  const output1 = { page: { list } };
  const result1 = menuApp($, mustache).utils.processMenuData(list);
  expect(result1).toMatchObject(output1);
});

test('test render menu', () => {
  const templateText = fs.readFileSync('templateHtml/menuTemplate.html').toString();
  document.body.innerHTML = '<div id="menu-list-entry"></div>';
  menuApp($, mustache).utils.renderMenuData(templateText, list);
  expect($('.menu-item').text()).toMatch(list[0].menuName);
});

test('test click menu', () => {
  const templateText = fs.readFileSync('templateHtml/menuTemplate.html').toString();
  document.body.innerHTML = '<div id="menu-list-entry"></div>';
  menuApp($, mustache).utils.renderMenuData(templateText, list);
  menuApp($, mustache).utils.bindUI();
  $('.panel').click();
  expect($('.panel').children('.menu-item').hasClass('active')).toEqual(true);
});

test('test click submenu', () => {
  const templateText = fs.readFileSync('templateHtml/menuTemplate.html').toString();
  document.body.innerHTML = '<div id="menu-list-entry"></div>';
  menuApp($, mustache).utils.renderMenuData(templateText, list);
  menuApp($, mustache).utils.bindUI();
  $('.menu-sub-item').click();
  expect($('.menu-sub-item').closest('.panel').children('.menu-item').hasClass('active')).toEqual(true);
});

test('test hover menu', () => {
  const templateText = fs.readFileSync('templateHtml/menuTemplate.html').toString();
  document.body.innerHTML = '<div id="menu-list-entry"></div>';
  menuApp($, mustache).utils.renderMenuData(templateText, list);
  menuApp($, mustache).utils.bindUI();
  $('.panel').trigger('mouseover');
  expect($('.panel > .panel-collapse').css('display')).toEqual('block');
});
