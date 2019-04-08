var superagent = require('superagent');
var file = require('fs');

var cookie = 'lianjia_uuid=c192d173-a144-488a-a1e1-01e2063eec07; _jzqc=1; UM_distinctid=162756afea4723-04e64969165a5d-336c7b05-384000-162756afea5929; _ga=GA1.2.582795583.1522388370; Hm_lvt_9152f8221cb6243a53c83b956842be8a=1522388374; _smt_uid=5abdcd96.9e0cdc8; lianjia_ssid=b71d800f-1281-4660-a9ca-4a3db048034e; _jzqa=1.2157746943795415300.1522388369.1522388369.1522654362.2; _jzqckmp=1; _gid=GA1.2.224190177.1522654363; _gat=1; _gat_past=1; _gat_global=1; _gat_new_global=1; _gat_dianpu_agent=1; select_city=120000; lianjia_token=2.001b438fb76254f2ed0aeea686bb050f56; _jzqb=1.3.10.1522654362.1; Hm_lpvt_9152f8221cb6243a53c83b956842be8a=1522654394; all-lj=406fadba61ceb7b8160b979dadec8dfa; CNZZDATA1254525948=542459717-1522652669-https%253A%252F%252Ftj.lianjia.com%252F%7C1522652669; Hm_lvt_efa595b768cc9dc7d7f9823368e795f1=1522654397; Hm_lpvt_efa595b768cc9dc7d7f9823368e795f1=1522654397';
var count = 0;
var result = [];
function getData(cookie, page) {

  superagent.get(`https://user.lianjia.com/site/housedata/?p=${page}&filter=1`)
    .set("Cookie", cookie)
    .end(function (err, res) {
      if (err) {
        throw err;
      };

      count++;
      var resp = JSON.parse(res.text);
      resp.data.list.forEach(item => {
        result.push(item.viewUrl);
      });
      
      if(count === 5) {
        file.writeFile('house-simple.json', JSON.stringify(result), (err) => {
          if(err) {
            console.log(err);
          }

          console.log('file write success');
        })
      }
    })
};

for(var i = 0; i < 5; i++) {
  getData(cookie, i + 1);
}
