/** 3.Array */
const fetch = require('node-fetch');

const url = 'https://raw.githubusercontent.com/ReactMaker/api_server/master/db/album.json';

/** async await */
const getAlbumData = async () => {
  try {
    const res = await fetch(url);
    const resJson = await res.json();
    const newJson = Object.assign([], resJson);
    return newJson;
  } catch (error) {
    throw error;
  }
};
/** Promise */
/*
const getAlbumData = () => new Promise((resolve, reject) => {
  fetch(url)
    .then(res => res.json())
    .then((json) => {
      const newJson = Object.assign([], json);
      resolve(newJson);
    })
    .catch((error) => {
      console.log('fetch error:', error);
      reject(error);
    });
});
*/
/**
   1. deep clone array
   輸入陣列，輸出一個深層複製的陣列。兩者記憶體位置不能一樣。
   fix this bug, a should be [1,2,3]:
   var a = [1,2,3];
   var b = a;
   b.push(4);
   console.log(a); // [1,2,3,4]
 */
const cloneArray = (a) => {
  // const b = JSON.parse(JSON.stringify(a));
  if (!(a instanceof Array)) {
    return null;
  }
  const b = Object.assign([], a);
  b.push(4);
  return a;
};

// const a = [1, 2, 3];
// const result = cloneArray(a);
// console.log('result:', result);

/**
   用 fetch 取得陣列到程式中

   2. 搜尋資料中id為特定的資料
   範例：
   輸入：5
   輸出：
   {
      "id": 5,
      "img": "https://unsplash.it/300/300?image=868",
      "title": "城市幻影2",
      "desc": "如詩般迷炫的法文爵士好歌, 樸實無華且細膩的爵士樂編曲，凸顯了「幻影」專輯中歌詞的如詩美感",
      "price": 300
    }
 */
/** async await */
const searchId = async (sid) => {
  if (!(/^\+?[1-9][0-9]*$/.test(sid) && Number.isInteger(sid))) {
    return null;
  }
  try {
    const newJson = await getAlbumData();
    const result2 = newJson.find(value => value.id === sid);
    return result2;
  } catch (error) {
    throw error;
  }
};

// const sid = 5;
// searchId(sid)
//   .then((result2) => {
//     console.log('2 result:', result2);
//   })
//   .catch((error) => {
//     console.log('2 error:', error);
//   });

/** Promise */
/*
const searchId = sid => new Promise((resolve, reject) => {
  getAlbumData()
    .then((newJson) => {
      const result2 = newJson.find(value => value.id === sid);
      resolve(result2);
    })
    .catch((error) => {
      reject(error);
    });
});
*/

/**
   用 fetch 取得陣列到程式中

   3. 模糊搜尋title包含特定文字的資料
   範例：
   輸入：美好
   輸出：
   {
        "id": 1,
        "img": "https://unsplash.it/300/300?image=946",
        "title": "美好時光1",
        "desc": "追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律",
        "price": 200,
        "discount": true
    },
    {
        "id": 2,
        "img": "https://unsplash.it/300/300?image=944",
        "title": "美好時光2",
        "desc": "追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律",
        "price": 300
    },
    {
        "id": 3,
        "img": "https://unsplash.it/300/300?image=882",
        "title": "美好時光3",
        "desc": "追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律",
        "price": 400
    }
 */
/** async await */
const searchTitle = async (title) => {
  if (!(typeof (title) === 'string' || title instanceof String)) {
    return null;
  }
  try {
    const newJson = await getAlbumData();
    const result3 = newJson.filter(value => value.title.indexOf(title) > -1);
    return result3;
  } catch (error) {
    throw error;
  }
};

// const title = '美好';
// searchTitle(title)
//   .then((result3) => {
//     console.log('3 result:', result3);
//   })
//   .catch((error) => {
//     console.log('3 error:', error);
//   });

/** Promise */
/*
const searchTitle = title => new Promise((resolve, reject) => {
  getAlbumData()
    .then((newJson) => {
      const result3 = newJson.filter(value => value.title.indexOf(title) > -1);
      resolve(result3);
    })
    .catch((error) => {
      reject(error);
    });
});
*/

/**
   用 fetch 取得陣列到程式中

   4. 新增一筆id=99的資料(內容隨意)，於id=10和id=11中間
   範例：

   輸入：{id: 99, img: 'xxx', title: 'xxx', desc: 'xxx', price: 100}
   輸出：
   ...
   {id: 10, img: 'xxx', title: 'xxx', desc: 'xxx', price: 800},
   {id: 99, img: 'xxx', title: 'xxx', desc: 'xxx', price: 100},
   {id: 11, img: 'xxx', title: 'xxx', desc: 'xxx', price: 2659},
   ...
 */
/** async await */
const insertData = async (data) => {
  if (!(typeof (data) === 'object' || data instanceof Object)) {
    return null;
  } else if (!(/^\+?[1-9][0-9]*$/.test(data.id) && Number.isInteger(data.id))) {
    return null;
  } else if (!(typeof (data.img) === 'string' || data.img instanceof String)) {
    return null;
  } else if (!(typeof (data.title) === 'string' || data.title instanceof String)) {
    return null;
  } else if (!(typeof (data.desc) === 'string' || data.desc instanceof String)) {
    return null;
  } else if (!(/^\d+$/.test(data.price) && Number.isInteger(data.price))) {
    return null;
  }
  try {
    const newJson = await getAlbumData();
    newJson.splice(10, 0, data);
    return newJson;
  } catch (error) {
    throw error;
  }
};

// const data = {
//   id: 99, img: 'xxx', title: 'xxx', desc: 'xxx', price: 100,
// };
// const data = {
//   id: 99, img: 'xxx', title: 'xxx', desc: 'xxx', price: 100,
// };
// insertData(data)
//   .then((result4) => {
//     console.log('4 result:', result4);
//   })
//   .catch((error) => {
//     console.log('4 error:', error);
//   });

/** Promise */
/*
const insertData = data => new Promise((resolve, reject) => {
  getAlbumData()
    .then((newJson) => {
      newJson.splice(10, 0, data);
      resolve(newJson);
    })
    .catch((error) => {
      reject(error);
    });
});
*/

/**
   用 fetch 取得陣列到程式中

   5. 修改id為特定的資料
   範例：
   輸入：3, {title: '修改title', desc: '修改desc'}
   輸出：
   ...
   {
        "id": 3,
        "img": "https://unsplash.it/300/300?image=882",
        "title": "修改title",
        "desc": "修改desc",
        "price": 400
    },
    ...
 */
/** async await */
const updateData = async (uid, udata) => {
  if (!(/^\+?[1-9][0-9]*$/.test(uid) && Number.isInteger(uid))) {
    return null;
  } else if (!(typeof (udata) === 'object' || udata instanceof Object)) {
    return null;
  } else if (!(typeof (udata.title) === 'string' || udata.title instanceof String)) {
    return null;
  } else if (!(typeof (udata.desc) === 'string' || udata.desc instanceof String)) {
    return null;
  }
  try {
    const newJson = await getAlbumData();
    const temp = newJson.slice(uid - 1, uid);
    const newTemp = Object.assign({}, temp[0], udata);
    newJson.splice(uid - 1, 1, newTemp);
    return newJson;
  } catch (error) {
    throw error;
  }
};

// const uid = 3;
// const udata = {
//   title: '修改title', desc: '修改desc',
// };
// updateData(uid, udata)
//   .then((result5) => {
//     console.log('5 result:', result5);
//   })
//   .catch((error) => {
//     console.log('5 error:', error);
//   });

/** Promise */
/*
const updateData = (uid, udata) => new Promise((resolve, reject) => {
  getAlbumData()
    .then((newJson) => {
      const temp = newJson.slice(uid - 1, uid);
      const newTemp = Object.assign({}, temp[0], udata);
      newJson.splice(uid - 1, 1, newTemp);
      resolve(newJson);
    })
    .catch((error) => {
      reject(error);
    });
});
*/

/**
   用 fetch 取得陣列到程式中

   6. 刪除特定id的資料
   輸入 5 輸出已經刪除完 id 為 5 的陣列
 */
/** async await */
const deleteData = async (did) => {
  if (!(/^\+?[1-9][0-9]*$/.test(did) && Number.isInteger(did))) {
    return null;
  }
  try {
    const newJson = await getAlbumData();
    newJson.splice(did - 1, 1);
    return newJson;
  } catch (error) {
    throw error;
  }
};

// const did = 5;
// deleteData(did)
//   .then((result6) => {
//     console.log('6 result:', result6);
//   })
//   .catch((error) => {
//     console.log('6 error:', error);
//   });

/** Promise */
/*
const deleteData = did => new Promise((resolve, reject) => {
  getAlbumData()
    .then((newJson) => {
      newJson.splice(did - 1, 1);
      resolve(newJson);
    })
    .catch((error) => {
      reject(error);
    });
});
*/

/**
   用 fetch 取得陣列到程式中

   7. 依照價格排序
   輸入 desc or asc
   輸出價格對應排序的陣列
 */
/** async await */
const sortByPrice = async (orderby) => {
  if (!(orderby === 'asc' || orderby === 'desc')) {
    return null;
  }
  try {
    const newJson = await getAlbumData();
    if (orderby === 'desc') {
      newJson.sort((x, y) => (x.price < y.price ? 1 : -1));
    } else if (orderby === 'asc') {
      newJson.sort((x, y) => (x.price > y.price ? 1 : -1));
    }
    return newJson;
  } catch (error) {
    throw error;
  }
};

// const orderby = 'asc'; //'desc';
// sortByPrice(orderby)
//   .then((result7) => {
//     console.log('7 result: ', result7);
//   })
//   .catch((error) => {
//     console.log('7 error: ', error);
//   });

/** Promise */
/*
const sortByPrice = orderby => new Promise((resolve, reject) => {
  getAlbumData()
    .then((newJson) => {
      if (orderby === 'desc') {
        newJson.sort((x, y) => (x.price < y.price ? 1 : -1));
      } else {
        newJson.sort((x, y) => (x.price > y.price ? 1 : -1));
      }
      resolve(newJson);
    })
    .catch((error) => {
      reject(error);
    });
});
*/


module.exports = {
  cloneArray,
  searchId,
  searchTitle,
  insertData,
  updateData,
  deleteData,
  sortByPrice,
};
