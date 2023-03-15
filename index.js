import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { menuArray } from './data.js'

const menuEl = document.querySelector('.menu')
const orderedItemsEl = document.querySelector('.ordered-items')
const totalPriceEl = document.getElementById('total-price')

const orderSummaryEl = document.querySelector('.order-summary')
const paymentModalEl = document.querySelector('.payment-modal')
const confirmEl = document.querySelector('.confirm-container')

const modalForm = document.querySelector('.modal-form')


let orderArray = []

document.addEventListener('click', (e) => {
    if(e.target.dataset.addBtn) {
        handleAddBtnClick(e.target.dataset.addBtn)
    }
    if(e.target.dataset.remove) {
        handleRemoveItemClick(e.target.dataset.remove)
    }
    if(e.target.id === 'order-btn') {
        handleOrderBtnClick()
    }
})

modalForm.addEventListener('submit', (e) => {
    e.preventDefault()

    document.getElementById('username').value = ''
    document.getElementById('card-number').value = ''
    document.getElementById('cvv').value = ''

    orderArray = []
    paymentModalEl.classList.add('hidden')
    orderSummaryEl.classList.add('hidden')
    confirmEl.classList.remove('hidden')
    render()
})

function handleAddBtnClick(itemId) {

    const clickedItemObj = menuArray.filter( (item) => { return item.id == itemId })[0]
    const orderedItem = {
        name: clickedItemObj.name,
        price: clickedItemObj.price,
        id: uuidv4()
    }
    orderArray.push(orderedItem)
    orderSummaryEl.classList.remove('hidden')
    confirmEl.classList.add('hidden')
    render()
}
function handleRemoveItemClick(itemId) {
    orderArray = orderArray.filter( (item) => { return item.id !== itemId })
    if(!orderArray.length) {
        orderSummaryEl.classList.add('hidden')
    }
    render()
}

function handleOrderBtnClick() {
    paymentModalEl.classList.remove('hidden')
}

function getMenu() {
    let menuStr = ''
    menuArray.forEach( (item) => {
        menuStr += `
                <div class="menu-item">
                    <p class="item-emoji">${item.emoji}</p>
                    <div class="item-text">
                        <p class="item-title regular-text">${item.name}</p>
                        <p class="item-desc small-text">${getIngredientsString(item.ingredients)}</p>
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

function getIngredientsString(ingredientsArray) {
    let ingredientsStr = ''
    for(let i=0; i<ingredientsArray.length; i++) {
        ingredientsStr += ingredientsArray[i]
        if(i !== ingredientsArray.length - 1) {
            ingredientsStr += ','
        }
    }
    return ingredientsStr;
}

function getOrderedItems() {
    let orderedItemsStr = ''
    orderArray.forEach( (item) => {
        orderedItemsStr += `
                     <div class="ordered-item">
                        <p class="regular-text">${item.name}</p>
                        <p class="remove-text" data-remove="${item.id}">remove</p>
                        <p class="price-right price-text">$${item.price}</p>
                    </div>
        `
    })
    return orderedItemsStr
}

function getTotalPrice() {
    let totalPrice = 0
    orderArray.forEach( (item) => {
        totalPrice += item.price
    })
    return totalPrice
}

function getConfirmText() {
    const username = document.getElementById('username').value
    const confirmText = `
                <div class="confirm">
                    <p class="confirm-text">Thanks, ${username}! Your order is on its way!</p>
                </div>
                `
    return confirmText
}

function render() {
    menuEl.innerHTML = getMenu()
    orderedItemsEl.innerHTML = getOrderedItems()
    totalPriceEl.textContent = '$' + getTotalPrice()
    confirmEl.innerHTML = getConfirmText()
}

render()

