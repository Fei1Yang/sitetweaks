// ==UserScript==
// @name        CurseForge Fast Download
// @namespace   https://dev.azure.com/fei1yang/sitetweaks
// @match       https://www.curseforge.com/*
// @grant       none
// @author      Fei1Yang
// @description Skip countdown page, force client requirement and more when downloading items from CurseForge.
// @license     GPL-3.0-only
// @version     1.0.0
// ==/UserScript==
const clientBtnSelectors = ['a[style="background-color: #F16436"]']
const pendingBtnSelectors = [
  'a[class="button button--hollow"]',
  'a[class="button  button--icon-only"]',
  'a[class="button button--icon-only button--sidebar"]',
]
const pendingTimerSelector = 'p[data-countdown-timer]'
const pendingURLSelector = 'a[class="alink underline"]'

if (location.href.endsWith('download') != true) {
  clientBtnSelectors.forEach((i) =>
    document.querySelectorAll(i).forEach((d) => {
      d.href = d.href.slice(0, -9)
      d.classList.toggle('button--hollow')
      d.style.backgroundColor = null
      d.innerHTML =
        '<span class="button__text"><svg class="icon icon-margin" viewBox="0 0 20 20" width="18" height="18"><use xlink:href="/Content/2-0-7785-14122/Skins/CurseForge/images/twitch/Action/Download.svg#Action/Download"></use></svg> Download</span>'
    })
  )

  pendingBtnSelectors.forEach((i) =>
    document.querySelectorAll(i).forEach((d) => {
      // Skip download buttons that don't include a file id
      if (isNaN(d.href.slice(-1)) != true) {
        d.href += '/file'
      }
    })
  )
} else {
  //Stop built-in redirect task.
  clearInterval(3)
  document.querySelector(pendingTimerSelector).innerText = 'Downloading now...'
  window.location.replace(document.querySelector(pendingURLSelector).href)
}

