// 英文內容，與繁中版逐段對應。PATS 本身介面目前只有繁體中文，英文頁會誠實註明。
import {
  SITE, path, asset, section, faqHtml, stepsHtml, featuresHtml, tableHtml, listHtml, ctaHtml
} from './lib.mjs';

const L = 'en';
const APP = SITE.appUrl;

export const ui = {
  lang: L,
  htmlLang: 'en',
  ogLocale: 'en_US',
  siteName: 'PATS',
  skip: 'Skip to main content',
  nav: [
    { href: path(L, 'home', 'features'), text: 'Features' },
    { href: path(L, 'getStarted'), text: 'Get started' },
    { href: path(L, 'noLine'), text: 'No LINE?' },
    { href: path(L, 'faq'), text: 'FAQ' }
  ],
  navLabel: 'Main navigation',
  switchLabel: '中文',
  switchTitle: '切換為繁體中文版',
  cta: 'Start free',
  breadcrumbLabel: 'Breadcrumb',
  homeCrumb: 'Home',
  updatedLabel: 'Last updated',
  footerTagline: 'a browser-based messenger with no app install and no phone number.',
  footerLinks: [
    { href: APP, text: 'Open PATS' },
    { href: path(L, 'getStarted'), text: 'Get started' },
    { href: path(L, 'noLine'), text: 'No LINE?' },
    { href: path(L, 'faq'), text: 'FAQ' },
    { href: SITE.basePath + '/llms.txt', text: 'llms.txt' },
    { href: SITE.repoUrl, text: 'GitHub' }
  ],
  ogImageAlt: 'PATS: chat in your browser without LINE or any app'
};

export const faqs = [
  { id: 'free', q: 'Is PATS free?',
    a: 'Yes. PATS is free to use, with no paid plans and no in-app purchases. All you need is a browser and an internet connection.' },
  { id: 'no-line', q: 'Can I use PATS without LINE?',
    a: 'Yes. PATS is a standalone messaging platform. It does not need LINE, Messenger, WhatsApp or any other chat app; both people just need a PATS account.' },
  { id: 'no-install', q: 'Do I need to download an app?',
    a: 'No. PATS runs in your web browser at vincent1021210.github.io. It takes no storage on your phone, and new versions are applied automatically.' },
  { id: 'no-phone', q: 'Can I sign up without a phone number?',
    a: 'Yes. PATS never asks for a phone number. Sign up with one tap using a Google account, or with an email address and password (confirmed by a 6-digit code sent to your inbox).' },
  { id: 'computer', q: 'Does PATS work on a computer?',
    a: 'Yes. It works in browsers on Windows, Mac and Chromebook, as well as on phones and tablets. Remember to sign out when you use a shared or school computer.' },
  { id: 'browsers', q: 'Which browsers are supported?',
    a: 'Use an up-to-date version of Chrome, Edge, Safari or Firefox. Voice and video calls require allowing microphone and camera access in the browser.' },
  { id: 'photos', q: 'Can I send photos, and how long are they kept?',
    a: 'Yes. On a phone you can take a photo or pick one from your gallery; it is compressed automatically before sending. Received photos can be opened full size and downloaded. Photos in chats are kept for 20 days and then expire, so download the important ones.' },
  { id: 'calls', q: 'Can I make voice or video calls?',
    a: 'Yes. PATS supports one-to-one voice and video calls in the browser. During a call you can mute, turn off the camera or switch between front and rear cameras.' },
  { id: 'groups', q: 'Can I create group chats?',
    a: 'Yes. Besides private messages you can create groups. Conversations you rarely use can be archived and restored later.' },
  { id: 'anyone', q: 'Who can use PATS?',
    a: 'Anyone. PATS has no age, school or membership restrictions; all you need is a Google account or an email address. Students, workers, family and friends can all use it.' },
  { id: 'invite', q: 'Why does sign-up ask for an invite code?',
    a: 'Only when an administrator turns on invite codes, to make sure only members of a school or group can join. Ask your teacher or administrator for the code; otherwise the field is not shown.' },
  { id: 'data', q: 'Where is my data stored? Is it safe?',
    a: 'The PATS backend runs on Google Apps Script. Messages are stored in Google Sheets and photos in Google Drive. All traffic uses HTTPS, and passwords are stored as hashes, never in plain text.' },
  { id: 'language', q: 'Is the PATS app available in English?',
    a: 'The PATS app interface is currently in Traditional Chinese. You can still chat in any language, and this guide explains each step in English.' },
  { id: 'forgot', q: 'What if I forget my password?',
    a: 'On the sign-in page choose \u201cForgot password\u201d (\u5fd8\u8a18\u5bc6\u78bc), enter your email, and set a new password with the verification code you receive. Google sign-in users do not need a password.' }
];

export const steps = [
  { name: 'Open the PATS website',
    text: 'Open vincent1021210.github.io in a browser (Chrome, Edge, Safari or Firefox) on your phone, tablet or computer.',
    html: 'Open <a href="' + APP + '">vincent1021210.github.io</a> in a browser (Chrome, Edge, Safari or Firefox) on your phone, tablet or computer. Nothing to download.',
    image: { src: 'img/app-login-desktop.webp', alt: 'PATS sign-in screen with Google and email sign-in options', w: 1280, h: 800 } },
  { name: 'Create an account',
    text: 'Choose \u201cSign up\u201d (\u7acb\u5373\u8a3b\u518a) and use your Google account, or enter a display name, email and password, then type the 6-digit code sent to your inbox. Enter an invite code if your administrator requires one.',
    html: 'Choose \u201cSign up\u201d (\u7acb\u5373\u8a3b\u518a) and use your Google account, or enter a display name, email and password (at least 8 characters), then type the 6-digit code sent to your inbox. Enter an invite code if your administrator requires one.' },
  { name: 'Add a contact and start chatting',
    text: 'After signing in, tap \u201cNew conversation\u201d to find someone, then send messages and photos or start a voice or video call.',
    html: 'After signing in, tap \u201cNew conversation\u201d (\u767c\u8d77\u65b0\u5c0d\u8a71) to find someone, then send messages and photos or start a voice or video call. Add the site to your home screen to open it like an app.' }
];

const features = [
  { icon: '💬', title: 'Private and group chats', text: 'Message one person or a whole group, search messages and contacts, and archive chats you rarely use.' },
  { icon: '🖼️', title: 'Send and save photos', text: 'Take a photo or pick one from your gallery; it is compressed automatically. Open received photos full size and download them.' },
  { icon: '📞', title: 'Voice and video calls', text: 'Call right in the browser, with mute, camera off and front/rear camera switching. No extra software.' },
  { icon: '🔑', title: 'No phone number', text: 'Sign in with Google in one tap, or register with email and password. Your phone number stays private.' },
  { icon: '🌏', title: 'Open to everyone', text: 'No school or membership required. Anyone can sign up with a Google account or email and chat with family, friends or classmates.' },
  { icon: '🔄', title: 'Always up to date', text: 'New versions load automatically. No app store updates and no storage used on your phone.' }
];

const audience = [
  'People who <strong>do not have LINE</strong> or prefer not to install any chat app',
  '<strong>Students</strong> whose phones cannot install apps, or who only use school computers or tablets',
  'People <strong>without a phone number</strong>, or who do not want to share it',
  'Anyone with <strong>low phone storage</strong> or an older phone that cannot run new apps',
  '<strong>Family members and older relatives</strong> who cannot install apps but can open a web address'
];

const compareRows = [
  ['App install', 'Not needed, runs in the browser', 'Download and regular updates'],
  ['Phone number', 'Not needed', 'Usually required'],
  ['On a computer', 'Just open a browser', 'Usually a separate desktop app'],
  ['Phone storage', 'Almost none', 'Grows with chat history'],
  ['Price', 'Free', 'Mostly free'],
  ['Sticker store', 'No', 'Usually yes']
];

const limits = [
  'An internet connection is required.',
  'The other person also needs a PATS account.',
  'Photos in chats expire after 20 days, so download the important ones.',
  'No sticker store or social feed; PATS focuses on messages and calls.',
  'The app interface is currently in Traditional Chinese.',
  'Some schools or groups require an invite code to sign up.'
];

const homeFaqIds = ['free', 'no-line', 'no-install', 'no-phone', 'computer', 'language'];

function heroHtml() {
  return '<section class="hero" aria-labelledby="hero-h">\n<div class="wrap hero-grid">\n<div>\n' +
    '<p class="eyebrow">Free \u00b7 No install \u00b7 No phone number</p>\n' +
    '<h1 id="hero-h">No LINE? You can still chat with everyone</h1>\n' +
    '<p class="lead">PATS is a messenger that runs in your browser. Sign in with Google to send private and group messages, share photos, and make voice and video calls.</p>\n' +
    '<div class="hero-actions">\n<a class="btn btn-primary btn-lg" href="' + APP + '">Start free</a>\n' +
    '<a class="btn btn-ghost btn-lg" href="' + path(L, 'getStarted') + '">3-minute guide</a>\n</div>\n' +
    listHtml(['Works on phone, tablet and computer', 'Uses no phone storage', 'Updates itself'], 'hero-facts') +
    '\n</div>\n' + mockupHtml() + '\n</div>\n</section>';
}

function mockupHtml() {
  return '<div class="mockup" aria-hidden="true">\n<div class="mock-bar"><span class="mock-dot"></span>PATS \u00b7 Class group</div>\n' +
    '<div class="mock-body">\n<p class="bubble in">I uploaded the notes for tomorrow</p>\n' +
    '<p class="bubble in img">📷 outline.jpg</p>\n<p class="bubble out">Got it! No LINE here, glad we have PATS 😂</p>\n' +
    '<p class="bubble in">Video call at 8 pm?</p>\n<p class="bubble out">OK, just call me on the web</p>\n</div>\n' +
    '<div class="mock-input">Type a message\u2026<span>➤</span></div>\n</div>';
}

export const pages = {
  home: {
    title: 'PATS | Chat Without LINE \u2013 Free Browser Messenger',
    description: 'PATS is a free messenger that runs in your browser. No LINE, no app and no phone number: sign in with Google to chat, share photos and make video calls.',
    type: 'home',
    faqIds: homeFaqIds,
    body: function () {
      return heroHtml() + '\n' +
        section('what', 'What is PATS?',
          '<p class="answer">PATS is a messaging platform that runs in your web browser. It needs no app download and no phone number: with a Google account or an email address, open <a href="' + APP + '">vincent1021210.github.io</a> on any phone, tablet or computer and start chatting.</p>\n' +
          '<p>It is built for people who do not have LINE, cannot install apps, or do not want to share a phone number. Messages, photos, groups and voice or video calls all happen in one web page, and new versions load automatically.</p>') + '\n' +
        section('who', 'Who is PATS for?',
          '<p class="answer">If LINE or a regular chat app does not work for you, PATS is a simple alternative. It is especially useful for:</p>\n' + listHtml(audience, 'checklist'), 'alt') + '\n' +
        section('features', 'What can PATS do?',
          '<p class="answer">PATS offers private and group chats, photo sending and downloading, voice and video calls, and anyone can sign up.</p>\n' + featuresHtml(features)) + '\n' +
        section('how', 'How do I start? (3 steps)',
          '<p class="answer">Open the site, create an account and add a contact. You can be chatting in about 3 minutes.</p>\n' + stepsHtml(steps.map(function (s) { return { name: s.name, html: s.html }; })) +
          '\n<p><a href="' + path(L, 'getStarted') + '">Read the full illustrated guide \u2192</a></p>', 'alt') + '\n' +
        section('compare', 'How is PATS different from LINE and other chat apps?',
          '<p class="answer">The main difference: PATS needs no install and no phone number, it works in the browser. It has no sticker store and focuses on messages and calls.</p>\n' +
          tableHtml('PATS compared with a typical chat app', ['Item', 'PATS', 'Typical chat app (e.g. LINE)'], compareRows)) + '\n' +
        section('limits', 'What are the limitations?',
          '<p class="answer">PATS needs an internet connection and both people need an account. Good to know before you start:</p>\n' + listHtml(limits), 'alt') + '\n' +
        section('faq', 'Frequently asked questions',
          faqHtml(faqs.filter(function (f) { return homeFaqIds.indexOf(f.id) >= 0; })) +
          '\n<p><a href="' + path(L, 'faq') + '">See all questions \u2192</a></p>') + '\n' +
        '<div class="wrap">' + ctaHtml({ title: 'Start now, nothing to install', text: 'Open your browser, sign in with Google and chat with friends in under 3 minutes.', button: 'Start free' }) + '</div>';
    }
  },

  faq: {
    title: 'PATS FAQ | Free? Phone Number? Video Calls?',
    description: 'PATS browser messenger FAQ: is it free, does it work without LINE or a phone number, which browsers work, how long photos are kept, who can use it and data safety.',
    type: 'faq',
    h1: 'PATS frequently asked questions',
    crumb: 'FAQ',
    faqIds: faqs.map(function (f) { return f.id; }),
    body: function () {
      return '<p class="answer">The most common questions about PATS. In short: PATS is free, needs no install and no phone number, and lets you chat, create groups, share photos and make video calls in the browser.</p>\n' +
        faqHtml(faqs) + '\n' +
        ctaHtml({ title: 'Still unsure? Trying it is fastest', text: 'Sign-up takes about a minute and no phone number.', button: 'Start free' });
    }
  },

  noLine: {
    title: 'No LINE? 5 Ways to Keep in Touch with Classmates and Family',
    description: 'No LINE, no app installs or no phone number? Compare text messages, email, social media DMs, school platforms and PATS, a free browser messenger, to stay in touch.',
    type: 'article',
    h1: 'No LINE? 5 ways to keep in touch with classmates and family',
    crumb: 'No LINE?',
    headline: 'No LINE? 5 ways to keep in touch with classmates and family',
    body: function () {
      return '<p class="answer"><strong>Short answer:</strong> without LINE, the closest experience is a no-install web messenger such as <a href="' + APP + '">PATS</a>. Sign in from a browser to chat, create groups, share photos and make video calls, with no phone number. For occasional contact, text messages or email also work.</p>\n' +
        '<p>People skip LINE for many reasons: their phone cannot install apps, parents do not allow chat apps yet, they have no phone number of their own, or storage is full. Here are 5 common options compared.</p>\n' +
        '<h2 id="m1">1. Text messages and phone calls</h2>\n<p>Works on almost every phone, but needs a phone number, is awkward for photos and hard for group discussion.</p>\n' +
        '<h2 id="m2">2. Email</h2>\n<p>Anyone with an inbox can use it, and it is good for files and formal notices, but replies are slow and it is not made for live chat.</p>\n' +
        '<h2 id="m3">3. Social media direct messages</h2>\n<p>Instagram or Facebook can send DMs, but usually need an app, have age limits and come with feeds and ads.</p>\n' +
        '<h2 id="m4">4. School learning platforms</h2>\n<p>Some have comments or messages for homework and announcements, but rarely live chat, photos or video.</p>\n' +
        '<h2 id="m5">5. A no-install web messenger: PATS</h2>\n<p class="answer">PATS works in the browser with no app and no phone number, making it the closest alternative to LINE.</p>\n' +
        listHtml(['Private and group chats with message search and archiving', 'Send photos straight from your camera and download received ones', 'One-to-one voice and video calls', 'Sign in from phones, tablets or school computers', 'Anyone can sign up: family, friends and classmates']) + '\n' +
        '<h2 id="compare">All 5 options compared</h2>\n' +
        tableHtml('Ways to keep in touch without LINE', ['Option', 'Phone number', 'Live chat', 'Photos', 'Groups', 'Video calls'], [
          ['Text and phone', 'Required', 'Yes', 'Awkward', 'Hard', 'Depends on phone'],
          ['Email', 'Not needed', 'No', 'Yes', 'Yes (group email)', 'No'],
          ['Social media DMs', 'Usually', 'Yes', 'Yes', 'Yes', 'Yes'],
          ['School platform', 'Not needed', 'Mostly no', 'Depends', 'Depends', 'Mostly no'],
          ['PATS web messenger', 'Not needed', 'Yes', 'Yes', 'Yes', 'Yes']
        ]) + '\n' +
        '<h2 id="tips">Tips for inviting friends to PATS</h2>\n' +
        listHtml(['Send the address vincent1021210.github.io and ask friends to sign up with Google.', 'Use \u201cAdd to Home Screen\u201d in your phone browser to open it like an app.', 'Sign out after using a school or shared computer.', 'Download important photos; chat photos expire after 20 days.']) + '\n' +
        ctaHtml({ title: 'No LINE? Try PATS now', text: 'No install and no phone number. Just open your browser.', button: 'Start free' }) + '\n' +
        '<p>Read next: <a href="' + path(L, 'getStarted') + '">Get started with PATS in 3 minutes</a>, <a href="' + path(L, 'faq') + '">PATS FAQ</a></p>';
    }
  },

  getStarted: {
    title: 'Get Started with PATS in 3 Minutes | Sign-up Guide',
    description: 'Start using the PATS browser messenger in 3 steps: open the website, sign up with Google or email, add a contact and start sending messages, photos and video calls.',
    type: 'howto',
    h1: 'Get started with PATS in 3 minutes',
    crumb: 'Get started',
    howtoName: 'How to start using the PATS web messenger',
    body: function () {
      return '<p class="answer">Getting started takes 3 steps: open <a href="' + APP + '">vincent1021210.github.io</a> in a browser, sign up with Google or email, then add a contact and start chatting. No app download and no phone number needed.</p>\n' +
        '<p class="note">Note: the PATS app interface is in Traditional Chinese. The Chinese button labels are shown in brackets below.</p>\n' +
        '<h2 id="before">What you need</h2>\n' +
        listHtml(['A phone, tablet or computer with internet access', 'An up-to-date Chrome, Edge, Safari or Firefox', 'A Google account, or any email address that can receive mail', 'An invite code from your administrator, if your school uses one']) + '\n' +
        '<h2 id="steps">Steps</h2>\n' + stepsHtml(steps) + '\n' +
        '<h2 id="mobile">Use it like an app on your phone</h2>\n' +
        '<figure class="phone-shot"><img src="' + asset('img/app-login-mobile.webp') + '" alt="PATS sign-in screen on a phone" width="390" height="844" loading="lazy" decoding="async"><figcaption>PATS opened in a phone browser</figcaption></figure>\n' +
        listHtml(['<strong>iPhone (Safari)</strong>: tap Share, then \u201cAdd to Home Screen\u201d.', '<strong>Android (Chrome)</strong>: tap \u201c\u22ee\u201d at the top right, then \u201cAdd to Home screen\u201d.']) + '\n' +
        '<h2 id="next">What to do next</h2>\n' +
        listHtml(['Create a group to work on projects with classmates', 'Send photos with the image button next to the message box', 'Start a voice or video call from the phone or camera icon at the top of a chat', 'Invite family or friends: send them the address and ask them to sign up with Google']) + '\n' +
        '<h2 id="trouble">Troubleshooting</h2>\n' +
        listHtml(['<strong>No verification code?</strong> Check your spam folder, or sign in with Google instead.', '<strong>No sound or video in calls?</strong> Allow microphone and camera access in your browser.', '<strong>Something looks wrong?</strong> Refresh the page; the latest version loads automatically.']) + '\n' +
        ctaHtml({ title: 'Ready?', text: 'Open PATS and sign up with Google in one tap.', button: 'Open PATS' }) + '\n' +
        '<p>Read next: <a href="' + path(L, 'noLine') + '">No LINE? 5 ways to keep in touch</a>, <a href="' + path(L, 'faq') + '">PATS FAQ</a></p>';
    }
  }
};

export const appInfo = {
  description: 'PATS is a free, no-install web messenger. Sign in from a browser to send private and group messages, share photos and make voice and video calls, without LINE or a phone number.',
  featureList: features.map(function (f) { return f.title + ': ' + f.text; })
};

export const notFound = {
  title: 'Page not found | PATS',
  h1: 'Page not found',
  text: 'The address may be mistyped, or the page has moved.'
};
