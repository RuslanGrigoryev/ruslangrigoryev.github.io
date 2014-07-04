
var module = function (_elem, _parent, _length, _interval, _percent) {
   var elem     = $(_elem),
       parent   = $(_parent),
       length   = _length,
       interval = _interval,
       percent  = _percent,
       init = function () {
           anim();
        },
       anim = function () {
           elem.animate({
               width: percent + '%'
           }, interval, 'easeInOutBack');
       };
    
    return {
        init: init
    }
};

var htmlSkill = module('.elemHtml', '.wrap', 800, 2000, 75),
    cssSkill  = module('.elemCss', '.wrap', 800, 2000, 80),
    preProcessorSkill = module('.elemPre', '.wrap', 800, 2000, 90),
    CssGrid = module('.elemGrid', '.wrap', 800, 2000, 100),
    jsSkill = module('.elemJs', '.wrap', 800, 2000, 60),
    gitSkill = module('.elemGit', '.wrap', 800, 2000, 80),
    cmsSkill = module('.elemCms', '.wrap', 800, 2000, 50),
    emailSkill = module('.elemMail', '.wrap', 800, 2000, 80),
    adobeSkill = module('.elemAdobe', '.wrap', 800, 2000, 90);
