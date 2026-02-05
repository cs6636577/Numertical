const { NextResponse } = require("next/server");

export async function Get(request){
    console.log("Blog get Hit");
    return NextResponse.json({msg: "api working"});
}
