// MISRIYYA push notifications
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',event=>{
  let d={};try{d=event.data?event.data.json():{};}catch(_){d={title:'പുതിയ ബിൽ',body:event.data?event.data.text():''};}
  const title=d.title||'പുതിയ ബിൽ';
  event.waitUntil(self.registration.showNotification(title,{
    body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',
    tag:d.tag||'new-bill',renotify:true,vibrate:[200,100,200,100,200],requireInteraction:false,data:{url:'./'}
  }));
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
    for(const c of list){if('focus' in c)return c.focus();}
    return self.clients.openWindow('./');
  }));
});
