import { menuArray } from './data.js'

const menuEl = document.querySelector('.menu')
const orderSummaryEl = document.querySelector('.order-summary')
const orderedItemsEl = document.querySelector('.ordered-items')
const totalPriceEl = document.getElementById('total-price')
const orderBtn = document.getElementById('order-btn')

let orderArray = []
let totalPrice = 0


document.addEventListener('click', (e) => {
    if(e.target.dataset.addBtn) {
        handleAddBtnClick(e.target.dataset.addBtn)
    }
})

function handleAddBtnClick(itemId) {

    let clickedItemName = menuArray.filter( (item) => { return item.id == itemId })[0].name

    orderArray.push(clickedItemName)
    // console.log(orderArray)

    render()


}

function getMenu() {
    let menuStr = ''
    menuArray.forEach( (item) => {
        let ingredientsStr = ''
        for(let i=0; i<item.ingredients.length; i++) {
            ingredientsStr += item.ingredients[i]
            if(i !== item.ingredients.length - 1) {
                ingredientsStr += ','
            }
        }
        menuStr += `
                <div class="menu-item">
                    <p class="item-emoji">${item.emoji}</p>
                    <div class="item-text">
                        <p class="item-title regular-text">${item.name}</p>
                        <p class="item-desc small-text">${ingredientsStr}</p>
                        <p class="item-price price-text">$${item.price}</p>
                    </div>
                    <div class="add-btn data-add-btn="${item.id}"">
                        <i class="fa-regular fa-plus add-icon" data-add-btn="${item.id}"></i>
                    </div>
                </div>
        `
    })
    return menuStr
}

function getOrderedItems() {
    let orderedItemsStr = ''


    orderArray.forEach( (item) => {
        const menuItemObj = menuArray.filter( (menuItem) => {
            return menuItem.name == item
        })[0]
        console.log(menuItemObj.name)
        orderedItemsStr += `
                     <div class="ordered-item">
                        <p class="regular-text">${item}</p>
                        <p class="remove-text">remove</p>
                        <p class="price-right price-text">$${menuItemObj.price}</p>
                    </div>
        `
    })

    return orderedItemsStr
}

function getTotalPrice() {
    let totalPrice = 0
    orderArray.forEach( (item) => {
        const menuItemObj = menuArray.filter( (menuItem) => {
            return menuItem.name == item
        })[0]
        totalPrice += menuItemObj.price
    })
    return totalPrice
}

function render() {
    menuEl.innerHTML = getMenu()
    orderSummaryEl.classList.remove('hidden')
    orderedItemsEl.innerHTML = getOrderedItems()
    totalPriceEl.textContent = '$' + getTotalPrice()
}

render()

