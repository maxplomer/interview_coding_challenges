var numberOfListItems = 150;
var height = window.innerHeight;
var width = window.innerWidth;
var sidebar, virtualList, list, badges;
var sidebarPosition = 'left';
var altOpenSidebar = false;

document.addEventListener("DOMContentLoaded", function(event) { 
  virtualList = document.getElementById("virtual-list");
  list = document.getElementById("list");
  sidebar = document.getElementById("sidebar");
  badges = document.querySelectorAll(".badge");
  hideSidebar();

  addItemsToVirtualList();
  addItemsToList();

  //Delay execution until finish current calls
  setTimeout(function() { 
    updateListItemPositions(false);
    list.style.display = '';
  }, 0);
});

document.addEventListener("mousemove", function(event) { 
  if (event.pageX < 20 && sidebarPosition == 'left') {
    if (!window.showSidebar) {
      showMySidebar(1000);
    }
  } else if ((width - event.pageX) < 20 && sidebarPosition == 'right') {
    console.log('show sidebar right');
    if (!window.showSidebar) {
      showMySidebar(1000);
    }
  } else {
    clearTimeout(window.showSidebar);
    window.showSidebar = null;
  }
});

function showMySidebar(delay) {
  if (sidebarPosition == 'left') {
    window.showSidebar = setTimeout(function() {
      sidebar.style.left = "0px"; //Show sidebar
    }, delay);
  } else {
    window.showSidebar = setTimeout(function() {
      sidebar.style.right = "0px"; //Show sidebar
    }, delay);
  }
}

window.onresize = function(event) {
  if (window.innerHeight == height) {
    //Horizontal resize
    //If decreasing width, redraw default list without transitions
    if (virtualList.className == '') {
      if (window.innerWidth > width) {
        //increasing width
        changeListLayout(null);
      } else {
        changeListLayout(null, true); // true is don't want transitions
      }
    }
    width = window.innerWidth
    
    //Redraw list if grid layout
    if (virtualList.className == 'grid') changeListLayout('grid');

  } else {
    //Vertical resize
    height = window.innerHeight;

    //Redraw list if metro layout
    if (virtualList.className == 'metro') changeListLayout('metro'); 
  }
};

function clearVirtualList() {
  while (virtualList.hasChildNodes()) {
    virtualList.removeChild(virtualList.lastChild);
  }
}

function addItemsToVirtualList() {
  for (var i=1; i<=numberOfListItems; i++) {
    var listItem = document.createElement('div');
    listItem.className = "list-item";
    listItem.innerHTML = '<div class="item-text">Item ' + i + '</div>';
    listItem.id = "virtual-list-item-" + i;
    virtualList.appendChild(listItem);
  }
}

function addItemsToList() {
  for (var i=1; i<=numberOfListItems; i++) {
    var listItem = document.createElement('div');
    listItem.className = "list-item";
    listItem.innerHTML = '<div class="top-bg-holder"><div class="top-bg"></div></div><div class="item-text">Item ' + i + '</div>';
    list.appendChild(listItem);
  }
}

function updateListItemPositions(withTransitions) {
  for (var i=0; i<list.children.length; i++) {
    var listItem = list.children[i];
    var virtualListItem = document.getElementById("virtual-list-item-" + (i+1));

    var itemOffsetTop = virtualListItem.offsetTop;
    var itemOffsetLeft = virtualListItem.offsetLeft;
    var itemOffsetWidth = virtualListItem.offsetWidth - 25; //Only used for list layout

    listItem.style.top = itemOffsetTop + "px";
    listItem.style.left = itemOffsetLeft + "px";
    listItem.style.width = itemOffsetWidth + "px";
    listItem.style.transition = (withTransitions ? "all 0.5s ease-in-out 0s" : "");
  }
}

function changeListLayout(layoutType, noTransitions) {
  if (virtualList.className == 'metro') {
    clearVirtualList();
    addItemsToVirtualList();
  }

  if (layoutType == "metro") changeVirtualListLayoutMetro();

  //Set class names for list and virtualList
  virtualList.className = (!!layoutType ? layoutType : "");
  list.className = (!!layoutType ? layoutType : "");

  for (var i=0; i<list.children.length; i++) {
    var listItem = list.children[i];

    if (layoutType) {
      //Create gradient effect
      var rgbValue = 80 + i;
      listItem.style.backgroundColor = 'rgb(' + rgbValue + ',' + rgbValue + ',' + rgbValue + ')';
    } else {
      listItem.style.backgroundColor = null;
    }
  }

  updateListItemPositions(!noTransitions);
}

function changeVirtualListLayoutMetro() {
  var numberOfRows = Math.floor(window.innerHeight / 83);
  var elementMatrix = [];
  var matrixRow = [];

  clearVirtualList();

  for (var i=1; i<=numberOfListItems; i++) {
    var listItem = document.createElement('div');
    listItem.className = "list-item";
    listItem.innerHTML = "Item " + i;
    listItem.id = "virtual-list-item-" + i;

    matrixRow.push(listItem);

    if (i % numberOfRows == 0) {
      elementMatrix.push(matrixRow);
      matrixRow = [];
    }
  }

  if (matrixRow.length > 0) elementMatrix.push(matrixRow);
  
  //Take transpose of list item matrix
  var elementMatrixTranspose = elementMatrix[0].map(function(col, i) { 
    return elementMatrix.map(function(row) { 
      return row[i] 
    })
  });

  elementMatrixTranspose.forEach(function(matrixRowTranspose) {
    matrixRowTranspose.forEach(function(listItem) {
      if (listItem) virtualList.appendChild(listItem);
    });

    var br = document.createElement('br');
    virtualList.appendChild(br);
  });
}

function handleSidebarButtonClick(layoutType, buttonElement) {
  //Remove active class from sidebar buttons
  for (var i=0; i<sidebar.children.length; i++) {
    sidebar.children[i].className = ""; 
  }

  buttonElement.className = "active";

  changeListLayout(layoutType);
}

function hideSidebar() {
  if (sidebarPosition == 'left') {
    sidebar.style.left = "-66px";
  } else {
    sidebar.style.right = "-66px";
  }

  //hide badges
  for (var i = 0; i < badges.length; i++) {
    badges[i].style.opacity = 0;
  }
}

function switchSidebar() {
  if (sidebarPosition == 'left') {
    sidebarPosition = 'right';
    sidebar.style.left = null;
    sidebar.style.right = "-66px";
  } else {
    sidebarPosition = 'left';
    sidebar.style.right = null
    sidebar.style.left = "-66px";
  }
}

//Detect Alt key up
document.onkeyup = function(event) {
  var isAlt = (event.which == 18);
  if (isAlt && altOpenSidebar) {
    showMySidebar(0);
    showBadges();
  }
}

function showBadges() {
  for (var i = 0; i < badges.length; i++) {
    badges[i].style.opacity = 1;
  }
}

//Detect Alt + Keypress
var onkeydown = function(event) {
  //Only detect keypress if sidebar closed
  if (sidebar.style.left == "0px") return;

  var key = event.which;
  var isAlt = !!event.altKey;

  if ( isAlt ) {
    switch (key) {
      case 18: // ignore alt key
        altOpenSidebar = true
        break;
      case 71: // G key
        handleSidebarButtonClick('grid', sidebar.children[3]);
        altOpenSidebar = false
        break;
      case 76: // L key
        handleSidebarButtonClick(null, sidebar.children[1]);
        altOpenSidebar = false
        break;
      case 77: // M key
        handleSidebarButtonClick('metro', sidebar.children[5]);
        altOpenSidebar = false
        break;
      case 81: // Q key
        switchSidebar();
        altOpenSidebar = false
        break;
      default:
        break;
    }
  }
};
