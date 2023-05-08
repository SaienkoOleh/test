const approvedUrlsStage = ['/pages/template-long', '/pages/crm', '/pages/live-chat', '/pages/ticketing-system', '/pages/helpdesk', '/pages/customer-service', '/pages/ticketing-system-long', 
'/pages/customer-service-long', '/pages/helpdesk-long', '/pages/live-chat-long', '/pages/crm-long']; 
// template pages where pricing table is shown
 const templatePagesPaths = approvedUrlsStage.includes(window.location.pathname);

// tab indexes used for matching selected plans on both tabs(annual, monthly)
const tabsForTemplates = { 0: 4, 1: 5, 2: 6, 3: 7, 4: 0, 5: 1, 6: 2, 7: 3 }
const tabsForPricing = { 0: 1, 1: 6, 2: 7, 3: 8, 4: 9, 6: 1, 7: 2, 8: 3, 9: 4 }
const pricingPlans = {
  0: { name: 'starter', price: 10, index: 0 },
  1: { name: 'basic', price: 60, index: 1 },
  2: { name: 'pro', price: 360, index: 2 },
  3: { name: 'advanced', price: 900, index: 3 },
  4: { name: 'enterprise', price: 0, index: 4 },
  5: { name: 'starter', price: 0, index: 5 },
  6: { name: 'basic', price: 50, index: 6 },
  7: { name: 'pro', price: 300, index: 7 },
  8: { name: 'advanced', price: 750, index: 8 },
  9: { name: 'enterprise', price: 0, index: 9 },
}
const pricingPlansTemplates = {
  0: { name: 'basic', price: 60, index: 0 },
  1: { name: 'pro', price: 360, index: 1 },
  2: { name: 'advanced', price: 900, index: 2 },
  3: { name: 'enterprise', price: 0, index: 3 },
  4: { name: 'basic', price: 50, index: 4 },
  5: { name: 'pro', price: 300, index: 5 },
  6: { name: 'advanced', price: 750, index: 6 },
  7: { name: 'enterprise', price: 0, index: 7 },
}

const planPricingInit = { 0: '$10', 1: '$60', 2: '$360', 3: '$900', 4: 'Contact us', 5: 'Only available for monthly subscription', 6: '$50', 7: '$300', 8: '$750' }
const planPricingInitTemplate = { 0: '$60', 1: '$360', 2: '$900', 3: 'Contact us', 4: '$50', 5: '$300', 6: '$750' }
// repeating price constants that will be reused
const combinedVoice = {
  monthly: 30,
  annual: 25
}
const combinedSms = {
  monthly: 20,
  annual: 17
}
// automation, voice, sms data
const automationPrice = {
  starter: {
    monthly: 'Not available',
    annual: 'Not available'
  },
  basic: {
    monthly: 30,
    annual: 25
  },
  pro: {
    monthly: 180,
    annual: 150
  },
  advanced: {
    monthly: 450,
    annual: 375
  },
  enterprise: {
    monthly: 'custom',
    annual: 'custom'
  }
}
const voicePrice = {
  starter: {
    monthly: 'Not available',
    annual: 'Not available'
  },
  basic: combinedVoice,
  pro: combinedVoice,
  advanced: combinedVoice,
  enterprise: combinedVoice,
}
const smsPrice = {
  starter: {
    monthly: 'Not available',
    annual: 'Not available'
  },
  basic: combinedSms,
  pro: combinedSms,
  advanced: combinedSms,
  enterprise: combinedSms,
}
// automation, voice, sms dropdown data
const automationDropdownPrice = {
  1: { monthly: 0, annual: 0},
  2: { monthly: 90, annual: 75},
  3: { monthly: 135, annual: 113},
  4: { monthly: 175, annual: 146},
  5: { monthly: 250, annual: 208},
  6: { monthly: 400, annual: 333},
  7: { monthly: 'custom', annual: 'custom'}
}
const voiceDropdownPrice = {
  1: { monthly: 0, annual: 0},
  2: { monthly: 90, annual: 75},
  3: { monthly: 135, annual: 113},
  4: { monthly: 175, annual: 146},
  5: { monthly: 250, annual: 208},
  6: { monthly: 400, annual: 333},
  7: { monthly: 'custom', annual: 'custom'}
}
const smsDropdownPrice = {
  1: { monthly: 0, annual: 0},
  2: { monthly: 60, annual: 50},
  3: { monthly: 90, annual: 75},
  4: { monthly: 140, annual: 117},
  5: { monthly: 216, annual: 180},
  6: { monthly: 408, annual: 340},
  7: { monthly: 'custom', annual: 'custom'}
}
let selectedPlan = templatePagesPaths ? pricingPlansTemplates[1] : pricingPlans[2]
let selectedPeriod = 'monthly'
const setPlanPrices = (getEl, pricingTabs, planPeriods) => {
  const priceTabs = getEl('heading-tab-pane__pricing price')
  priceTabs[0].innerHTML = planPricingInit[0]
  priceTabs[1].innerHTML = planPricingInit[1]
  priceTabs[2].innerHTML = planPricingInit[2]
  priceTabs[3].innerHTML = planPricingInit[3]
  priceTabs[5].innerHTML = planPricingInit[6]
  priceTabs[6].innerHTML = planPricingInit[7]
  priceTabs[7].innerHTML = planPricingInit[8]
  getEl('text-link__pricing')[0].innerHTML = planPricingInit[4]
  getEl('text-link__pricing')[1].innerHTML = planPricingInit[4]
  planPeriods[0].click()
  pricingTabs[2].click()
}

// price calculation begins here
const estimatePrice = (getEl, getElId) => {
  const planPeriods = getEl('text-menu__pricing') 
  const isAutomationToggleActive = getEl('w-checkbox-input')[0].classList.contains('w--redirected-checked')
  const isVoiceToggleActive = getEl('w-checkbox-input')[1].classList.contains('w--redirected-checked')
  const isSmsToggleActive = getEl('w-checkbox-input')[2].classList.contains('w--redirected-checked')
  const automationPriceEl = getElId('pricing-automation')
  const voicePriceEl = getElId('pricing-phone')
  const smsPriceEl = getElId('pricing-sms')
  // const showHideDropdown = (el, show) => show ? el.classList.removeClass('hidden') : el.classList.addClass('hidden') 
  let ctaTextDisplay = document.querySelectorAll(".button.pricing")[0].innerHTML;
  let ctaHrefDisplay = document.querySelectorAll(".button.pricing")[0].href;
  const isEnterprisePlan = selectedPlan.name === 'enterprise'
  const automationDropdown = getElId('automation-interaction-2')
  const voiceDropdown = getElId('number-phone-interaction-2')
  const smsDropdown = getElId('number-sms-interaction-2')

  if (selectedPlan.name =='starter') {
    Array.from(getEl('wrapper-master-select__pricing')).forEach(el => el.style['pointer-events'] = 'none')
      automationPriceEl.style.color = "#afafaf";
      planPeriods[1].style['pointer-events'] = 'none';
      planPeriods[1].style.opacity = '0.4'; 
   } else {
    $("#wf-form-pricing-form .wrapper-master-checkbox__pricing>*:nth-child(1n) .heading-text-content__pricing span").css("color", "#1a9970");
    Array.from(getEl('wrapper-master-select__pricing')).forEach(el => el.style['pointer-events'] = 'auto')
  }

  const automationTotalPrice = isAutomationToggleActive 
    ? automationDropdownPrice[automationDropdown.value[selectedPeriod]] 
    : automationPrice[selectedPlan.name][selectedPeriod] 
  const voiceTotalPrice = isVoiceToggleActive 
    ? voiceDropdownPrice[voiceDropdown.value[selectedPeriod]] 
    : voicePrice[selectedPlan.name][selectedPeriod] 
  const smsTotalPrice = isSmsToggleActive 
    ? smsDropdownPrice[smsDropdown.value[selectedPeriod]] 
    : smsPrice[selectedPlan.name][selectedPeriod] 
  const checkIfString = (el) => typeof el === 'string'
  const returnValue = (el) =>  checkIfString(el) ? el : '+$' + el + '/mo';
  console.log(returnValue(voiceTotalPrice))
  let totalPrice = selectedPlan.price + returnValue(automationTotalPrice) + returnValue(voiceTotalPrice) + returnValue(smsTotalPrice)
  totalPrice = isEnterprisePlan && 'Custom Price'
  ctaTextDisplay = isEnterprisePlan ? 'Contact us' : 'Start a free trial'
  ctaHrefDisplay =  isEnterprisePlan 
    ? 'https://www.gorgias.com/demo?plan_name='+ selectedPlan.name +'&period=' + selectedPeriod
    : 'https://www.gorgias.com/signup?plan_name='+ selectedPlan.name +'&period=' + selectedPeriod

    automationPriceEl.innerHTML = returnValue(automationTotalPrice);
    voicePriceEl.innerHTML = returnValue(voiceTotalPrice)
    smsPriceEl.innerHTML = returnValue(smsTotalPrice)
    getEl('heading-tab-pane__pricing price-form')[0].innerHTML = totalPrice
}
document.addEventListener("DOMContentLoaded", () => {
  const getEl = (val) => document.getElementsByClassName(val)
  const getElId = (val) => document.getElementById(val)
  const planPeriods = getEl('text-menu__pricing')
  const pricingTabs = getEl('tab-pane__pricing')
  const selects = document.getElementsByTagName('select');
  // set plan prices
  setPlanPrices(getEl, pricingTabs, planPeriods)

  // add event listener for when we change period tab from monthly to yearly and viceversa
  for (let i = 0; i < planPeriods.length; i++) {
    planPeriods[i].addEventListener('click', function () {
      const chooseTabs = templatePagesPaths ? tabsForTemplates : tabsForPricing
      pricingTabs[chooseTabs[selectedPlan.index]].click()
      i === 1 ? selectedPeriod === 'annual' : 'monthly'

    });
  }
  // add event listener for when we change dropdowns values
  for (let i = 0; i < selects.length; i++) {
    selects[i].addEventListener('change', function () {
      estimatePrice(getEl, getElId)
    });
  }
  // find if we have selected checkboxes
  const checkBoxes = getEl('w--redirected-checked')
  for (let i = 0; i < pricingTabs.length; i++) {
    pricingTabs[i].addEventListener('click', function () {
      if (i === 0) {
        planPeriods[1].style['pointer-events'] = 'none';
        planPeriods[1].style.opacity = '0.4'; 
      } else {
        planPeriods[1].style['pointer-events'] = 'auto';
        planPeriods[1].style.opacity = '1';
      }
      selectedPlan = pricingPlans[i]
      estimatePrice(getEl, getElId)
      if (checkBoxes.length) {
        // when changing plan we deselect them
        Array.from(checkBoxes).forEach(el => {
          el.parentNode.nextElementSibling.nextElementSibling.firstChild.click()
        })
      }
    });
  }
});
