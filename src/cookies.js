
export function set(cname, cvalue) {

    const d = new Date();

    d.setTime(d.getTime() + (24*60*60*1000));
    let expires = "expires="+ d.toUTCString();

    document.cookie = cname + "=" + encripte(cvalue) + ";" + expires + ";path=/";

}

export function remove(cname){

    const d = new Date();

    d.setTime(d.getTime() - (24*60*60*1000));
    let expires = "expires="+ d.toUTCString();

    document.cookie = cname + "= ;" + expires + ";path=/";

}

export function loadAll(){

    let cookie = [];
    let tmp = [];
    let count = 0;

    for(let co of document.cookie.split(';')){

        tmp = co.split('=');

        if(tmp.length == 2){

            cookie[count] = {
                name: tmp[0],
                value: tmp[2]
            };

            count += 1;

        }

    }

    return cookie;

}

export function get(key){

    let tmp;

    for(let co of document.cookie.split(';')){

        tmp = co.trim().split('=');

        if(tmp.length == 2){

            if(tmp[0] == key){
                return decripte(tmp[1]);
            }

        }

    }

    return null;

}

export function encripte(str){

    let str_length = str.length;
    let half = Math.floor(str_length/2);

    let str1_length = Math.floor(half/2);
    let str2_length = half - str1_length;
    let str3_length = Math.floor((str_length-half)/2);
    let str4_length = (str_length - half) - str3_length;

    let str1 = str.substr(0, str1_length);
    let str2 = str.substr(str1_length, str2_length);
    let str3 = str.substr(str1_length+str2_length, str3_length);
    let str4 = str.substr(str_length - str4_length, str4_length);

    return str4+str1+str3+str2+str1_length+str2_length+str3_length+str4_length;

}

export function decripte(str){

    let dstr = str.slice((str.length - (str.length*2)), -4);
    let dstr_length = dstr.length;

    let str1_length = parseInt(str.charAt(dstr_length));
    let str2_length = parseInt(str.charAt(dstr_length+1));
    let str3_length = parseInt(str.charAt(dstr_length+2));
    let str4_length = parseInt(str.charAt(dstr_length+3));

    let str1 = str.substr(str4_length, str1_length);
    let str2 = str.substr(dstr_length - str2_length, str2_length);
    let str3 = str.substr(str4_length+str1_length, str3_length);
    let str4 = str.substr(0, str4_length);

    return str1 + str2 + str3 + str4;

}
