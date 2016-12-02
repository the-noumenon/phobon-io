import { Pane, ISlider } from "./../slider/main";

export class Home extends Pane {
    private _header: JQuery;
    private _blurb: JQuery;

    constructor(parent: ISlider) {
        super("home", "square", parent);
        this._backgroundClass = "gr-home";
    }

    protected layout() {
        this._site = $("<div class='f h-100 f-d-column f-j-center f-ai-center c-white'/>");
        this._header = $("<h3 class='f-none w-80 o-0'>Hi, I'm Ben, a software developer based in Perth, Western Australia. I specialise in designing user interfaces; focusing on building awesome, performant front-end experiences.</h3>").appendTo(this._site);
        this._blurb = $("<h3 class='f-none w-80 f-d-row f-w m-t-large o-0'><span class='f-none m-r-small'>I'm currently developing at</span><a class='f-none m-r-small' href='http://acquire.com.au' target='_blank'>acQuire</a><span class='f-none m-r-small'>but I've recently helped</span><a class='f-none m-r-small' href='http://thestudiophysio.com' target='_blank'>The Studio</a><span class='f-none f-w'>with their boutique branding</span></h3>.").appendTo(this._site);        
    }

    protected enterActions(): Promise<void> {
        var p: Promise<void> = new Promise((resolve, reject) => { 
            this._header.velocity("stop");
            this._blurb.velocity("stop");

            var s = [
                { 
                    e: this._header,
                    p: { opacity: [1, 0], translateY: [0, 200] },
                    o: { 
                        delay: 1500,
                        duration: 1000,
                        easing: "easeOutExpo"
                    }
                },
                { 
                    e: this._blurb,
                    p: { opacity: [0.5, 0], translateY: [0, 200] },
                    o: { 
                        duration: 900,
                        sequenceQueue: false,
                        delay: 300,
                        easing: "easeOutExpo",
                        complete: () => {
                            resolve();
                        }
                    }
                }
            ];

            $.Velocity.RunSequence(s);
         });        

        return p;        
    }

    protected exitActions(): Promise<void> {
        var p: Promise<void> = new Promise((resolve, reject) => {
            this._header.velocity("stop");
            this._blurb.velocity("stop");

            var s = [
                { 
                    e: this._header,
                    p: { opacity: 0, translateY: [-200, 0] },
                    o: { 
                        duration: 400,
                        easing: "easeInQuad"
                    }
                },
                { 
                    e: this._blurb,
                    p: { opacity: 0, translateY: [-200, 0] },
                    o: { 
                        duration: 400,
                        sequenceQueue: false,
                        delay: 200,
                        easing: "easeInQuad",
                        complete: () => {
                            setTimeout(() => {
                                resolve();
                            }, 1000);
                        }
                    }
                }
            ];

            $.Velocity.RunSequence(s);
        });        

        return p;      
    }
}