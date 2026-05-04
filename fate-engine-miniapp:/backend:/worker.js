export default {
async fetch(req, env) {

const cors = {
"Access-Control-Allow-Origin":"*",
"Access-Control-Allow-Headers":"*"
};

if(req.method === "OPTIONS")
return new Response("",{headers:cors});

const url = new URL(req.url);

/* ===================== AI FATE ===================== */
if(url.pathname === "/fate"){

const body = await req.json();

const prompt = `
You are Chinese Fate Oracle AI.

User:
Energy:${body.energy}
Streak:${body.streak}
Score:${body.score}

Generate destiny reading in Chinese:
- emotional
- mystical
- short powerful
`;

const ai = await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{
Authorization:`Bearer ${env.OPENAI_KEY}`,
"Content-Type":"application/json"
},
body: JSON.stringify({
model:"gpt-4o-mini",
messages:[{role:"user",content:prompt}],
temperature:0.9
})
});

const data = await ai.json();

return new Response(JSON.stringify({
fate: data.choices[0].message.content
}),{headers:cors});
}

/* ===================== CANDLE SYSTEM ===================== */
if(url.pathname === "/candle"){

const body = await req.json();

await fetch(env.SUPABASE_URL + "/rest/v1/users",{
method:"POST",
headers:{
apikey:env.SUPABASE_KEY,
Authorization:`Bearer ${env.SUPABASE_KEY}`,
"Content-Type":"application/json"
},
body: JSON.stringify({
id: body.id,
event:"candle",
value:1
})
});

return new Response(JSON.stringify({ok:true}),{headers:cors});
}

/* ===================== LEADERBOARD ===================== */
if(url.pathname === "/board"){

const res = await fetch(env.SUPABASE_URL + "/rest/v1/users?select=*");

const data = await res.json();

return new Response(JSON.stringify(data),{headers:cors});
}

return new Response("OK");
}
};