// 퍼블리싱을 위한 JS - 개발시 사용하230x230cs0089지 않음
const guideToggleBtn = (targetClass, toggleClass, removeClass, targetTxt) => {
    console.group('Guide style toggle');
    document.querySelectorAll(targetClass).forEach(me => {
        let el = me;
        if (targetTxt != undefined && targetTxt == 'parent') {
            el = el.parentElement;
        }
        if (removeClass != undefined && removeClass != 'undefined') {
            el.classList.add(toggleClass);
            //removeClass.map(classname => el.classList.remove(classname));
            const rClass = removeClass.split(',');
            rClass.map(classname => el.classList.remove(classname.trim()));
        } else {
            el.classList.toggle(toggleClass);
        }
        console.log(el);
    });
    console.groupEnd('Guide style toggle');
}; 

// component list
const pageList = {
    CM: {
        CM0001: {
            theme: true,
            sprint: '',
            name: `GNB
            <!--
            [Dev Ver. GNB <a href="./components/CM0001/CM0001.html" class="sample">B2C</a> <a href="./components/CM0001/CM0001-b2b.html" class="sample">B2B</a>]
                [ GNB <a href="./components/CM0001/CM0001-origin.html" class="sample">B2C</a> <a href="./components/CM0001/CM0001-b2b-origin.html" class="sample">B2B</a>]
                <div>
                    [RO Cookie - explicit(명시적)] 
                    <a href="./components/CM0001/CM0001-SG-cookie.html" class="sample">SG</a>
                    <a href="./components/CM0001/CM0001-TH-cookie.html" class="sample">TH</a>
                    <a href="./components/CM0001/CM0001-TR-cookie.html" class="sample">TR</a>
                    <a href="./components/CM0001/CM0001-FR-cookie.html" class="sample">FR (dimmed)</a><br>
                    [RO Cookie - implicit(암묵적)] 
                    <a href="./components/CM0001/CM0001-CL-cookie.html" class="sample">CL</a>
                    <a href="./components/CM0001/CM0001-KZ-cookie.html" class="sample">KZ</a>
                    <a href="./components/CM0001/CM0001-BR.html" class="sample">BR</a>
                </div>
                -->
            `,
            sub: [
                {
                    'name' : 'GNB (B2B)',
                    'file' : 'CM0001-b2b.html',
                },
                {
                    'name' : 'origin',
                    'file' : 'CM0001-origin.html',
                },
                {
                    'name' : 'B2B origin(24/03/11 운영중인 1depth & outlink 반영)',
                    'file' : 'CM0001-b2b-origin.html',
                },
                {
                    'name' : 'SG (explicit)',
                    'file' : 'CM0001-SG-cookie.html"',
                },
                {
                    'name' : 'TH (explicit)',
                    'file' : 'CM0001-TH-cookie.html',
                },
                {
                    'name' : 'TR (explicit)',
                    'file' : 'CM0001-TR-cookie.html',
                },
                {
                    'name' : 'FR (explicit, dimmed)',
                    'file' : 'CM0001-FR-cookie.html',
                },
                {
                    'name' : 'CL (implicit)',
                    'file' : 'CM0001-CL-cookie.html',
                },
                {
                    'name' : 'KZ (implicit)',
                    'file' : 'CM0001-KZ-cookie.html',
                },
                {
                    'name' : 'BR(Kalk Script)',
                    'file' : 'CM0001-BR.html',
                },                
            ],
            url: './components/CM0001/CM0001.html',
            old: 'GPC0001',
        },
        CM0002: {
            theme: true,
            sprint: '',
            name: 'Footer',
            url: './components/CM0002/CM0002.html',
            old: 'GPC0002, GPC0076',
        },
        CM0003: {
            sprint: '',
            name: 'Social Share',
            url: './components/CM0003/CM0003.html',
            old: 'GPC0032',
        },
        CM0004: {
            theme: true,
            sprint: '',
            name: 'Social Component',
            url: './components/CM0004/CM0004.html',
            old: 'GPC0064',
        },
        CM0005: {
            sprint: '',
            name: 'Sitemap',
            url: './components/CM0005/CM0005.html',
            old: 'GPC0041',
        },
        CM0006: {
            sprint: '',
            name: 'Glossary',
            url: './components/CM0006/CM0006.html',
            old: '',
        },
        CM0007: {
            sprint: '',
            name: 'Quick Menu',
            url: './components/CM0007/CM0007.html',
            old: '',
        },
        CM0008: {
            sprint: '',
            name: 'Book a Show Room',
            url: './components/CM0008/CM0008.html',
            old: '',
        },
        CM0009: {
            sprint: '',
            name: 'Register Now',
            url: './components/CM0009/CM0009.html',
            old: '',
        },
        CM0010: {
            theme: true,
            sprint: '',
            name: 'Join Members',
            url: './components/CM0010/CM0010.html',
            old: '',
        },
        CM0012: {
            sprint: '',
            name: 'Member Days_Offer',
            url: './components/CM0012/CM0012.html',
            old: '',
        },
        CM0013: {
            sprint: '',
            name: 'Time Sales',
            url: './components/CM0013/CM0013.html',
            old: '',
        },
        CM000A: {
            sprint: '',
            name: 'Sign Up - B2B',
            url: './components/CM000A/CM000A.html',
            old: 'B2B RO_VN, RO_MX, RO_IN',
            sub: [
                {
                    'name' : 'Sign up 약관 동의 영역 (Except SA)',
                    'file' : 'CM000A_1.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'Sign up 약관 동의 영역 (only SA)',
                    'file' : 'CM000A_1_sa.html',
                    'dir' : 'rtl',
                },
                {
                    'name' : '약관 재동의',
                    'file' : 'CM000A_2.html',
                },
                {
                    'name' : '이메일 주소 확인 완료 페이지 (DE)',
                    'file' : 'CM000A_3.html',
                },
                {
                    'name' : 'MX B2B VIP 인증코드 발송 안내',
                    'file' : 'CM000A_popup.html',
                },
            ]
        },
    },
    ST: {
        ST0001: {
            theme: true,
            sprint: '',
            name: 'Hero Image',
            url: './components/ST0001/ST0001.html',
            old: 'GPC0055, GPC0078, GPC0025, GPC0152, GPC0031, GPC0068',
        },
        ST0002: {
            sprint: '',
            name: 'Tab Anchor',
            url: './components/ST0002/ST0002.html',
            old: 'GPC0117',
        },
        ST0003: {
            sprint: '',
            name: 'Title',
            url: './components/ST0003/ST0003.html',
            old: 'GPC, GPC0063',
        },
        ST0004: {
            sprint: '',
            name: 'Block Image - Text Overlay',
            url: './components/ST0004/ST0004.html',
            old: 'GPC0059, GPC0060',
        },
        ST0005: {
            sprint: '',
            name: 'Image CTA Overlay',
            url: './components/ST0005/ST0005.html',
            old: 'GPC0071, GPC0091',
        },
        ST0006: {
            sprint: '',
            name: 'Category Selector',
            url: './components/ST0006/ST0006.html',
            old: 'GPC0065',
        },
        ST0007: {
            sprint: '',
            name: 'Block Image',
            url: './components/ST0007/ST0007.html',
            old: 'GPC0062. GPC0067',
        },
        ST0008: {
            sprint: '',
            name: 'Slider Image',
            url: './components/ST0008/ST0008.html',
            old: 'GPC0049, GPC0050, GPC0135',
        },
        ST0009: {
            sprint: '',
            name: 'Large Image',
            url: './components/ST0009/ST0009.html',
            old: 'GPC0052, GPC0053',
        },
        ST0010: {
            theme: true,
            sprint: '',
            name: 'Text',
            url: './components/ST0010/ST0010.html',
            old: 'GPC0069, GPC0070',
        },
        ST0011: {
            sprint: '',
            name: 'Compare Image',
            url: './components/ST0011/ST0011.html',
            old: 'GPC0089, GPC0090',
        },
        ST0012: {
            sprint: '',
            name: 'Table',
            url: './components/ST0012/ST0012.html',
            old: 'GPC0072, GPC0073',
        },
        ST0013: {
            sprint: '',
            name: 'Side Image - Text',
            url: './components/ST0013/ST0013.html',
            old: 'GPC0043, GPC0044',
        },
        ST0014: {
            sprint: '',
            name: 'Image - Layered Text',
            url: './components/ST0014/ST0014.html',
            old: 'GPC0048',
        },
        // ST0015: {
        //     sprint: '',
        //     name: 'Recommended Promotions',
        //     url: './components/ST0015/ST0015.html',
        //     old: 'GPC0029',
        // },
        ST0016: {
            sprint: '',
            name: 'Image - Text (folding feature)',
            url: './components/ST0016/ST0016.html',
            old: 'GPC0042',
        },
        ST0017: {
            sprint: '',
            name: 'Large Image - Large or 2 Small Image',
            url: './components/ST0017/ST0017.html',
            old: 'GPC0046',
        },
        ST0018: {
            sprint: '',
            name: 'Centered Image Block',
            url: './components/ST0018/ST0018.html',
            old: 'RO_CN',
            //old: 'GPC0047',
        },
        ST0019: {
            sprint: '',
            name: 'Gallery - 10Pickers',
            url: './components/ST0019/ST0019.html',
            old: 'GPC0074',
        },
        ST0020: {
            sprint: '',
            name: 'Product Spec Info',
            url: './components/ST0020/ST0020.html',
            old: 'GPC0088',
        },
        ST0021: {
            sprint: '',
            name: 'Link Icon - Text',
            url: './components/ST0021/ST0021.html',
            old: 'GPC0045',
        },
        ST0022: {
            sprint: '',
            name: 'Coupon Code',
            url: './components/ST0022/ST0022.html',
            old: 'GPC0147',
        },
        ST0023: {
            sprint: '',
            name: 'PDP Support',
            url: './components/ST0023/ST0023.html',
            old: 'GPC0015',
        },
        ST0024: {
            sprint: '',
            name: 'Step Up Chart',
            url: './components/ST0024/ST0024.html',
            old: 'GPC0066',
        },
        ST0025: {
            theme: true,
            sprint: '',
            name: 'FAQ',
            url: './components/ST0025/ST0025.html',
            old: 'GPC0040',
        },
        ST0026: {
            sprint: '',
            name: 'Emergency Notice',
            url: './components/ST0026/ST0026.html',
            old: 'GPC0087',
        },
        ST0027: {
            sprint: '',
            name: 'Key Benefit Summary',
            url: './components/ST0027/ST0027.html',
            old: 'GPC0164',
        },
        ST0028: {
            sprint: '',
            name: 'Article List',
            url: './components/ST0028/ST0028.html',
            old: 'GPC0084',
        },
        ST0029: {
            sprint: '',
            name: 'Event Banner',
            url: './components/ST0029/ST0029.html',
            old: 'GPC0106',
        },
        ST0030: {
            sprint: '',
            name: 'Event Map',
            url: './components/ST0030/ST0030.html',
            old: 'GPC0107',
        },
        ST0031: {
            sprint: '',
            name: 'Business Showroom',
            url: './components/ST0031/ST0031.html',
            old: 'GPC0119',
        },
        ST0032: {
            sprint: '',
            name: 'B2B Air Solution Resource',
            url: './components/ST0032/ST0032.html',
            old: 'GPC0131',
        },
        ST0034: {
            sprint: '',
            name: 'Vertical Selector',
            url: './components/ST0034/ST0034.html',
            old: 'GPC0005',
        },
        ST0035: {
            sprint: '',
            name: 'Interactive Gallery Image',
            url: './components/ST0035/ST0035.html',
            old: 'GPC0057',
        },
        ST0036: {
            sprint: '',
            name: 'Feature Icon Tab',
            url: './components/ST0036/ST0036.html',
            old: 'GPC0061',
        },
        ST0037: {
            sprint: '',
            name: 'Back to list button',
            url: './components/ST0037/ST0037.html',
            old: 'GPC0133',
        },
        ST0038: {
            sprint: '',
            name: 'Scroll Image',
            url: './components/ST0038/ST0038.html',
            old: 'GPC0056',
        },
        ST0039: {
            sprint: '',
            name: 'Link Icon - Text - Tab',
            url: './components/ST0039/ST0039.html',
            old: 'GPC0115',
        },
        ST0040: {
            sprint: '',
            name: 'PLP Stock List',
            url: './components/ST0040/ST0040.html',
            old: 'GPC0125',
        },
        ST0041: {
            sprint: '',
            name: 'Promotion NotifyMe',
            url: './components/ST0041/ST0041.html',
            old: 'GPC0148',
        },
        ST0044: {
            theme: true,
            sprint: '',
            name: 'Block Content',
            url: './components/ST0044/ST0044.html',
            old: 'GPC0155',
        },
        ST0045: {
            sprint: '',
            name: 'Article Title',
            url: './components/ST0045/ST0045.html',
            old: '',
        },
        ST0047: {
            sprint: '',
            name: 'Product Finder Link',
            url: './components/ST0047/ST0047.html',
            old: '',
        },
        ST0048: {
            sprint: '',
            name: 'Carousel',
            url: './components/ST0048/ST0048.html',
            old: '',
        },
        ST0049: {
            sprint: '',
            name: 'Carousel Block Image',
            url: './components/ST0049/ST0049.html',
            old: 'GPC0051',
        },
        ST0050: {
            sprint: '',
            name: 'Attached Multimedia',
            url: './components/ST0050/ST0050.html',
            old: '',
        },
        ST0053: {
            sprint: '',
            name: 'Award',
            url: './components/ST0053/ST0053.html',
            old: '',
        },
        ST0054: {
            sprint: '',
            name: 'Code Component',
            url: './components/ST0054/ST0054.html',
            old: '',
        },
        ST0058: {
            sprint: '',
            name: 'Product Category',
            url: './components/ST0058/ST0058.html',
            old: '',
        }, 
        ST0059: {
            sprint: '',
            name:`Marketing withdrawal`,
            url: './components/ST0059/ST0059.html',
            old: '',
            sub: [
                {
                    'name' : 'Marketing withdrawal VN',
                    'file' : 'ST0059-VN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'Marketing withdrawal SA, EG_ar ',
                    'file' : 'ST0059-RTL.html',
                    'dir' : 'rtl',
                },
                {
                    'name' : 'Marketing withdrawal TW',
                    'file' : 'ST0059-TW.html',
                    'dir' : 'ltr',
                },
            ]
        },
        ST0060: {
            sprint: '',
            name: 'Secret Coupon Popup',
            url: './components/ST0060/ST0060.html',
            old: '',
        },
        ST0061: {
            sprint: '',
            name: 'Secret Coupon Page',
            url: './components/ST0061/ST0061.html',
            old: '',
        },
    },
    PD: {
        PD0001: {
            sprint: '',
            name: 'Product List',
            url: './components/PD0001/PD0001.html',
            old: 'GPC0007',
            sub: [
                {
                    'name' : 'Product List -> SA RTL version',
                    'file' : 'PD0001_sa.html',
                    'dir' : 'rtl',
                },
            ]
        },
        PD0002: {
            sprint: '',
            name: 'Selective offering',
            url: './components/PD0002/PD0002.html',
            old: 'GPC0003, GPC0004',
        },
        PD0003: {
            sprint: '',
            name: `Product Summary`,
            url: './components/PD0003/PD0003.html',
            //old: 'RO_DE, RO_CA, RO_FR, RO_CN',
            //old: 'GPC0009',
            subtype: 'inline',
            sub: [
                {
                    'name' : 'DE',
                    'file' : 'PD0003-DE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'ID',
                    'file' : 'PD0003-ID.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'IT',
                    'file' : 'PD0003-IT.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PT',
                    'file' : 'PD0003-PT.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'SG',
                    'file' : 'PD0003-SG.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'AU',
                    'file' : 'PD0003-AU.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'VN',
                    'file' : 'PD0003-VN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'BR',
                    'file' : 'PD0003-BR.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CL',
                    'file' : 'PD0003-CL.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CO',
                    'file' : 'PD0003-CO.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'FR',
                    'file' : 'PD0003-FR.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CN',
                    'file' : 'PD0003-CN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'HK',
                    'file' : 'PD0003-HK.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'TH',
                    'file' : 'PD0003-TH.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'KZ',
                    'file' : 'PD0003-KZ.html"',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'ES',
                    'file' : 'PD0003-ES.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'JP',
                    'file' : 'PD0003-JP.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'JP-fee-list',
                    'file' : 'PD0003-fee-list.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'JP-fee-table',
                    'file' : 'PD0003-fee-table.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'MX',
                    'file' : 'PD0003-MX.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'TR',
                    'file' : 'PD0003-TR.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'SA_EN',
                    'file' : 'PD0003-SA.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'SA_RTL',
                    'file' : 'PD0003-SA.html',
                    'dir' : 'rtl',
                },
                {
                    'name' : 'CA_EN',
                    'file' : 'PD0003-CA.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'IN',
                    'file' : 'PD0003-IN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PA(CAC_EN)',
                    'file' : 'PD0003-CAC_EN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PE',
                    'file' : 'PD0003-PE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PL',
                    'file' : 'PD0003-PL.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CZ',
                    'file' : 'PD0003-CZ.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'SE',
                    'file' : 'PD0003-SE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'ZA',
                    'file' : 'PD0003-ZA.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'NL',
                    'file' : 'PD0003-NL.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'EG_EN',
                    'file' : 'PD0003-EG.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'EG_RTL',
                    'file' : 'PD0003-EG.html',
                    'dir' : 'rtl',
                },
            ]
        },
        PD0004: {
            sprint: '',
            name: 'PDP Reviews (3rd Party)',
            url: './components/PD0004/PD0004.html',
            old: 'GPC0014, GPC0121',
            subtype: 'inline',
            sub: [
                {
                    'name' : 'BV1',
                    'file' : 'PD0004-BV1.html',
                },
                {
                    'name' : 'BV2',
                    'file' : 'PD0004-BV2.html',
                },
                {
                    'name' : 'Shoppilot',
                    'file' : 'PD0004-SP.html',
                    'dir' : 'ltr',
                },
            ]
        },
        PD0005: {
            theme: true,
            sprint: '',
            name: 'PDP Gallery',
            url: './components/PD0005/PD0005.html',
            old: '',
        },
        PD0006: {
            theme: true,
            sprint: '',
            name: 'Product Service and Support',
            url: './components/PD0006/PD0006.html',
            old: 'GPC0101',
        },
        PD0007: {
            sprint: '',
            name: 'PDP Bundle',
            url: './components/PD0007/PD0007.html',
            old: 'GPC0012',
        },
        PD0008: {
            sprint: '',
            name: 'PDP Specs',
            url: './components/PD0008/PD0008.html',
            old: 'GPC0013',
        },
        PD0009: {
            sprint: '',
            name: 'Article Utility Button',
            url: './components/PD0009/PD0009.html',
            old: '',
        },
        PD0010: {
            sprint: '',
            name: 'PDP QnA',
            url: './components/PD0010/PD0010.html',
            old: 'GPC0016',
        },
        PD0011: {
            sprint: '',
            name: 'Product Finder',
            url: './components/PD0011/PD0011.html',
            old: 'GPC0134, GPC0142',
        },
        PD0012: {
            theme: true,
            sprint: '',
            name: 'Product Visual',
            url: './components/PD0012/PD0012.html',
            old: '',
        },
        PD0013: {
            sprint: '',
            name: 'PDP Find a Dealer',
            url: './components/PD0013/PD0013.html',
            old: 'GPC0020',
        },
        PD0014: {
            sprint: '',
            name: 'Sticky Compare',
            url: './components/PD0014/PD0014.html',
            old: 'GPC0022',
        },
        PD0015: {
            sprint: '',
            name: 'Promotion - Product List',
            url: './components/PD0015/PD0015.html',
            old: 'GPC0026',
        },
        PD0016: {
            theme: true,
            sprint: '',
            name: 'Where To Buy',
            url: './components/PD0016/PD0016.html',
            old: 'GPC0102, GPC0017, GPC0108, GPC0143',
        },
        PD0017: {
            sprint: '',
            name: 'PDP Resources',
            url: './components/PD0017/PD0017.html',
            old: 'GPC0018',
        },
        PD0018: {
            sprint: '',
            name: 'Flagship Product List',
            url: './components/PD0018/PD0018.html',
            old: 'GPC0082',
            subtype: 'inline',
            sub: [
                {
                    'name' : 'Less than six',
                    'file' : 'PD0018-six-or-less.html',
                },
            ]
        },
        PD0019: {
            sprint: '',
            name: 'PDP Stock List',
            url: './components/PD0019/PD0019.html',
            old: 'GPC0114',
        },
        // PD0020: {
        //     sprint: '',
        //     name: 'Add-on Bundle',
        //     url: './components/PD0020/PD0020.html',
        //     old: 'GPC0010',
        // },
        PD0021: {
            sprint: '',
            name: 'Recently Viewed',
            url: './components/PD0021/PD0021.html',
            old: 'GPC0150',
        },
        PD0022: {
            sprint: '',
            name: 'PDP Compatible Products',
            url: './components/PD0022/PD0022.html',
            old: '',
        },
        // PD0023: {
        //     sprint: '',
        //     name: 'Popular Promotions',
        //     url: './components/PD0023/PD0023.html',
        //     old: 'GPC0027',
        // },
        PD0024: {
            sprint: '',
            name: 'Compliance MDA',
            url: './components/PD0024/PD0024.html',
            old: 'GPC0109',
        },
        // PD0025: {
        //     sprint: '',
        //     name: 'Brand shop',
        //     url: './components/PD0025/PD0025.html',
        //     old: 'GPC0108',
        // },
        PD0026: {
            sprint: '',
            name: 'Business Download Resource',
            url: './components/PD0026/PD0026.html',
            old: 'GPC0081',
        },
        PD0027: {
            sprint: '',
            name: 'Reviews',
            url: './components/PD0027/PD0027.html',
            old: 'GPC0120',
        },
        // PD0028: {
        //     sprint: '',
        //     name: 'Best Promotion',
        //     url: './components/PD0028/PD0028.html',
        //     old: 'GPC0058',
        // },
        // PD0029: {
        //     sprint: '',
        //     name: 'Exciting Promotion Offers',
        //     url: './components/PD0029/PD0029.html',
        //     old: 'GPC0028',
        // },
        PD0030: {
            sprint: '',
            name: 'Recommended Bundles',
            url: './components/PD0030/PD0030.html',
            old: 'GPC0006, GPC0021',
        },
        PD0033: {
            theme: true,
            sprint: '',
            name: 'Functional Tab',
            url: './components/PD0033/PD0033.html',
            old: 'GPC0011, GPC0151',
            subtype: 'inline',
            sub: [
                {
                    'name' : 'DE',
                    'file' : 'PD0033-DE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CA',
                    'file' : 'PD0033-CA.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'FR',
                    'file' : 'PD0033-FR.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'BR',
                    'file' : 'PD0033-BR.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CN',
                    'file' : 'PD0033-CN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'SG',
                    'file' : 'PD0033-SG.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'ID',
                    'file' : 'PD0033-ID.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'IT',
                    'file' : 'PD0033-IT.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PT',
                    'file' : 'PD0033-PT.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'HK',
                    'file' : 'PD0033-HK.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'TH',
                    'file' : 'PD0033-TH.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'KZ',
                    'file' : 'PD0033-KZ.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'ES',
                    'file' : 'PD0033-ES.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'JP',
                    'file' : 'PD0033-JP.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'MX',
                    'file' : 'PD0033-MX.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'AU',
                    'file' : 'PD0033-AU.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CL, CO',
                    'file' : 'PD0033-CL.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'TR',
                    'file' : 'PD0033-TR.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'SA_EN',
                    'file' : 'PD0033-SA.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'VN',
                    'file' : 'PD0033-VN.html',
                    'dir' : 'ltr',
                },

                // 2nd
                {
                    'name' : 'IN',
                    'file' : 'PD0033-IN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'HU',
                    'file' : 'PD0033-HU.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'AT',
                    'file' : 'PD0033-AT.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'NL',
                    'file' : 'PD0033-NL.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CZ',
                    'file' : 'PD0033-CZ.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PL',
                    'file' : 'PD0033-PL.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'SE',
                    'file' : 'PD0033-SE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PA(CAC_EN)',
                    'file' : 'PD0033-CAC_EN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'TW',
                    'file' : 'PD0033-TW.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CH',
                    'file' : 'PD0033-CH.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PE',
                    'file' : 'PD0033-PE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'EG',
                    'file' : 'PD0033-EG.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'BE',
                    'file' : 'PD0033-BE.html',
                    'dir' : 'ltr',
                },
            ]
        },
        PD0034: {
            sprint: '',
            name: 'Where to buy (RU)',
            url: './components/PD0034/PD0034.html',
            old: 'GPC0112',
        },
        PD0035: {
            sprint: '',
            name: 'Where to buy (CN)',
            url: './components/PD0035/PD0035.html',
            old: 'GPC0113',
        },
        PD0036: {
            sprint: '',
            name: 'PDP Find a Dealer (CN)',
            url: './components/PD0036/PD0036.html',
            old: 'GPC0116',
        },
        PD0037: {
            sprint: '',
            name: 'Brand Shop (CN)',
            url: './components/PD0037/PD0037.html',
            old: 'GPC0118',
        },
        PD0038: {
            sprint: '',
            name:'Compare Result <!-- <a href="https://s3.ap-northeast-2.amazonaws.com/yb.the51/dist/components/PD0038/PD0038.html" class="sample">CA Page</a>  -->',
            url: './components/PD0038/PD0038.html',
            old: 'RO_CN',
        },
        // PD0039: {
        //     sprint: 'current',
        //     name: 'Blog Hashtag Title',
        //     url: './components/PD0039/PD0039.html',
        //     old: '',
        // },
        // PD0040: {
        //     sprint: '',
        //     name: 'Promotion Review',
        //     url: './components/PD0040/PD0040.html',
        //     old: 'GPC0132',
        // },
        PD0041: {
            theme: true,
            sprint: '',
            name: 'Hot & New/Best',
            url: './components/PD0041/PD0041.html',
            old: 'GPC0157',
        },
        PD0042: {
            sprint: '',
            name: 'Compare Products',
            url: './components/PD0042/PD0042.html',
            old: 'GPC0116',
        },
        PD0043: {
            sprint: '',
            name: 'Featured Product',
            url: './components/PD0043/PD0043.html',
            old: '',
        },
        PD0044: {
            sprint: '',
            name: 'Toast Popup',
            url: './components/PD0044/PD0044.html',
            old: '',
        },
        PD0045: {
            sprint: '',
            name: 'In House Review',
            url: './components/PD0045/PD0045.html',
            old: 'GPC0103',
        },
        PD0046: {
            theme: true,
            sprint: '',
            name: 'Product Content',
            url: './components/PD0046/PD0046.html',
            old: '',
        },
        // PD0047: {
        //     sprint: '',
        //     name: 'Compare Table',
        //     url: './components/PD0047/PD0047.html',
        //     old: '',
        // },
        PD0048: {
            sprint: '',
            name: 'In the box',
            url: './components/PD0048/PD0048.html',
            old: '',
        },
        // PD0049: {
        //     name: 'Review',
        //     url: '',
        //     old: '',
        // },
        PD0050: {
            sprint: '',
            name: 'PDP FAQ',
            url: './components/PD0050/PD0050.html',
            old: '',
        },
        PD0053: {
            sprint: '',
            name: 'Image with layer popup',
            url: './components/PD0053/PD0053.html',
            old: '',
        },        
        PD0055: {
            sprint: '',
            name: 'Product selector',
            url: './components/PD0055/PD0055.html',
            old: '',
        },
        PD0056: {
            sprint: '',
            name: 'Find a Store Popup',
            url: './components/PD0056/PD0056.html',
            old: '',
        },
        PD0057: {
            sprint: '',
            name: 'Find a Store Page',
            url: './components/PD0057/PD0057.html',
            old: '',
        },
        PD0058: {
            sprint: '',
            name: 'Apps List',
            url: './components/PD0058/PD0058.html',
            old: '',
        },        
    },
    PR: {
        PR0001: {
            sprint: '',
            name: 'Promotion List',
            url: './components/PR0001/PR0001.html',
            old: 'GPC0030',
        },
        PR0002: {
            sprint: '',
            name: 'Explore List',
            url: './components/PR0002/PR0002.html',
            old: '',
        },
        PR0003: {
            sprint: '',
            name: 'Recommended Article',
            url: './components/PR0003/PR0003.html',
            old: '',
        },
        PR0004: {
            sprint: '',
            name: 'Package Deal',
            url: './components/PR0004/PR0004.html',
            old: '',
            sub: [
                {
                    'name' : 'TEST page ( + CM0007 )',
                    'file' : 'PR0004-CM0007.html',
                },
            ]
        },
        PR0005: {
            sprint: '',
            name: 'Redemption',
            url: './components/PR0005/PR0005.html',
            old: '',
        },
        PR0007: {
            sprint: '',
            name: 'Recommended Promotions',
            url: './components/PR0007/PR0007.html',
            old: '',
        },
        PR0008: {
            sprint: '',
            name: 'Promotion Block',
            url: './components/PR0008/PR0008.html',
            old: '',
        },
        PR0009: {
            sprint: '',
            name: 'Rolling Banner',
            url: './components/PR0009/PR0009.html',
            old: '',
        },
        PR0010: {
            sprint: '',
            name: 'Select Shop Menu',
            url: './components/PR0010/PR0010.html',
            old: '',
        },
        PR0011: {
            sprint: '',
            name: 'Select Shop',
            url: './components/PR0011/PR0011.html',
            old: '',
        },
        PR0012: {
            sprint: '',
            name: 'Select Shop Recommended Products',
            url: './components/PR0012/PR0012.html',
            old: '',
        },
        PR0013: {
            sprint: '',
            name: 'Member Days_Hot Deal',
            url: './components/PR0013/PR0013.html',
            old: '',
        },
        PR0014: {
            sprint: '',
            name: 'Business Shop',
            url: './components/PR0014/PR0014.html',
            old: '',
        },
        PR0015: {
            sprint: '',
            name: 'New & Upcoming',
            url: './components/PR0015/PR0015.html',
            old: '',
        },
        PR0016: {
            sprint: '',
            name: 'Best Products Ranking',
            url: './components/PR0016/PR0016.html',
            old: '',
        },
    },
    BU: {
        BU0001: {
            sprint: '',
            name: 'Inquiry To Buy',
            url: './components/BU0001/BU0001.html',
            old: '',
        },
        BU0002: {
            sprint: '',
            name: 'Catalogue & Leaflet & Document Download',
            url: './components/BU0002/BU0002.html',
            old: '',
        },
        BU0003: {
            sprint: '',
            name: 'Manual Download',
            url: './components/BU0003/BU0003.html',
            old: '',
        },
        BU0004: {
            sprint: '',
            name: 'Tab',
            url: './components/BU0004/BU0004.html',
            old: '',
        },
        BU0005: {
            sprint: '',
            name: 'Select Shop Menu (B2B)',
            url: './components/BU0005/BU0005.html',
            old: '',
        },
        BU0006: {
            sprint: '',
            name: 'Select Shop (B2B)',
            url: './components/BU0006/BU0006.html',
            old: '',
        },
        BU0007: {
            sprint: '',
            name: 'Select Shop Recommended Products (B2B)',
            url: './components/BU0007/BU0007.html',
            old: '',
        },
        BU000A: {
            sprint: '',
            name: 'RO KZ - Fill out an application',
            url: './components/BU000A/BU000A.html',
            old: '',
        },
        
    },
    SE: {
        SE0001: {
            sprint: '',
            name: 'Search bar',
            url: './components/SE0001/SE0001.html',
            old: '',
        },
        SE0002: {
            sprint: '',
            name: 'Search Result',
            url: './components/SE0002/SE-SearchResults.html',
            old: '',
        },
        SE0003: {
            sprint: '',
            name: 'Search For Topic',
            url: './components/SE0003/SE0003.html',
            old: '',
        },
        SE0004: {
            sprint: '',
            name: 'Search results for',
            url: './components/SE0004/SE0004.html',
            old: '',
        },
    },
    CS: {
        CS0002: {
            sprint: 'done',
            name: 'Product Category Select',
            url: './components/CS0002/CS0002.html',
        },
        CS0003: {
            sprint: 'done',
            name: 'Track My Order Form.',
            url: './components/CS0003/CS0003.html',
        },
        CS0004: {
            sprint: 'done',
            name: 'CS FAQ',
            url: './components/CS0004/CS0004.html',
        },
        // CS0005: {
        //     sprint: 'current',
        //     name: 'Contents Search',
        //     url: './components/CS0005/CS0005.html',
        // },
        CS0006: {
            sprint: 'done',
            name: 'My Product',
            url: './components/CS0006/CS0006.html',
        },
        CS0007: {
            sprint: 'done',
            name: 'Block Image (Static)',
            url: './components/CS0007/CS0007.html',
        },
        CS0008: {
            sprint: 'done',
            name: 'Variable Text',
            url: './components/CS0008/CS0008.html',
        },
        CS0009: {
            sprint: 'done',
            name: 'Column Banner',
            url: './components/CS0009/CS0009.html',
        },
        CS0010: {
            sprint: 'done',
            name: 'Column Block',
            url: './components/CS0010/CS0010.html',
        },
        CS0011: {
            sprint: 'done',
            name: 'Step_DateTime',
            url: './components/CS0011/CS0011.html',
        },
        CS0012: {
            sprint: 'done',
            name: 'Register Form_Manually',
            url: './components/CS0012/CS0012.html',
        },
        CS0013: {
            sprint: 'done',
            name: 'CS Search Category Popup',
            url: './components/CS0013/CS0013.html',
        },
        CS0014: {
            sprint: 'done',
            name: 'Contents Image',
            url: './components/CS0014/CS0014.html',
        },
        CS0015: {
            sprint: 'done',
            name: 'Anchor tap',
            url: './components/CS0015/CS0015.html',
        },
        CS0016: {
            sprint: 'done',
            name: 'Motion Slide',
            url: './components/CS0016/CS0016.html',
        },
        CS0017: {
            sprint: 'done',
            name: 'QR Code Location',
            url: './components/CS0017/CS0017.html',
        },
        CS0018: {
            sprint: 'done',
            name: 'CS Icon Text',
            url: './components/CS0018/CS0018.html',
        },
        CS0019: {
            sprint: 'done',
            name: 'Inquiry Status_Result',
            url: './components/CS0019/CS0019.html',
        },
        CS0020: {
            sprint: 'done',
            name: 'CS Email Us_Request',
            url: './components/CS0020/CS0020.html',
        },
        CS0021: {
            sprint: 'done',
            name: 'CS Inquiry Status',
            url: './components/CS0021/CS0021.html',
        },
        CS0022: {
            sprint: 'done',
            name: 'CS Document Upload',
            url: './components/CS0022/CS0022.html',
        },
        CS0023: {
            sprint: 'done',
            name: 'CS Your Voice to The President	',
            url: './components/CS0023/CS0023.html',
        },
        CS0024: {
            sprint: 'done',
            name: 'CS Contents Detail',
            url: './components/CS0024/CS0024.html',
        },
        CS0025: {
            sprint: 'done',
            name: 'CS Share Your Feedback',
            url: './components/CS0025/CS0025.html',
        },
        CS0026: {
            sprint: 'done',
            name: 'CS Popup',
            url: './components/CS0026/CS0026.html',
        },
        CS0027: {
            sprint: 'done',
            name: 'CS Find My Model Number Popup',
            url: './components/CS0027/CS0027.html',
        },
        CS0028: {
            sprint: 'done',
            name: 'CS PSP_ManualnSoftware',
            url: './components/CS0028/CS0028.html',
        },
        CS0029: {
            sprint: 'done',
            name: 'Environment',
            url: './components/CS0029/CS0029.html',
        },
        CS0030: {
            sprint: 'done',
            name: 'Annoucement',
            url: './components/CS0030/CS0030.html',
        },
        CS0031: {
            sprint: 'done',
            name: 'Store list',
            url: './components/CS0031/CS0031.html',
        },
        CS0032: {
            sprint: 'done',
            name: 'Right to Repair_Inquiry Parts',
            url: './components/CS0032/CS0032.html',
        },
        CS0033: {
            sprint: 'done',
            name: 'Block Icon',
            url: './components/CS0033/CS0033.html',
        },
        CS0034: {
            sprint: 'done',
            name: 'Text Banner',
            url: './components/CS0034/CS0034.html',
        },
        CS0035: {
            sprint: 'done',
            name: 'CS Title',
            url: './components/CS0035/CS0035.html',
        },
        CS0036: {
            sprint: 'done',
            name: 'Parts list',
            url: './components/CS0036/CS0036.html',
        },
        CS0037: {
            sprint: 'done',
            name: 'CS Banner',
            url: './components/CS0037/CS0037.html',
        },
        CS0038: {
            sprint: 'done',
            name: 'Product Service and Support',
            url: './components/CS0038/CS0038.html',
        },
        CS0039: {
            sprint: 'done',
            name: 'Box list',
            url: './components/CS0039/CS0039.html',
        },
        CS0040: {
            sprint: 'done',
            name: 'Repair Request_Select Model Number',
            url: './components/CS0040/CS0040.html',
        },
        CS0041: {
            sprint: 'done',
            name: 'Find a store',
            url: './components/CS0041/CS0041.html',
        },
        CS0042: {
            sprint: 'done',
            name: 'Find a Service Center',
            url: './components/CS0042/CS0042.html',
        },
        CS0043: {
            sprint: 'done',
            name: 'Repair Main Block',
            url: './components/CS0043/CS0043.html',
        },
        CS0044: {
            sprint: 'done',
            name: 'Repair Request_Step1',
            url: './components/CS0044/CS0044.html',
        },
        CS0045: {
            sprint: 'done',
            name: 'CS PSP_Troubleshoot',
            url: './components/CS0045/CS0045.html',
        },
        CS0046: {
            sprint: 'done',
            name: 'CS PSP_Warranty',
            url: './components/CS0046/CS0046.html',
        },
        CS0047: {
            sprint: 'done',
            name: 'CS Accordion',
            url: './components/CS0047/CS0047.html',
        },
        CS0048: {
            sprint: 'done',
            name: 'CS Tab',
            url: './components/CS0048/CS0048.html',
        },
        CS0049: {
            sprint: 'done',
            name: 'CS Input Form_Category',
            url: './components/CS0049/CS0049.html',
        },
        // CS0050: {
        //     sprint: 'done',
        //     name: 'Input Form_Scan Label',
        //     url: './components/CS0050/CS0050.html',
        // },
        CS0051: {
            sprint: 'done ',
            name: 'Input Form_Scan QR',
            url: './components/CS0051/CS0051.html',
        },
        CS0052: {
            sprint: 'done',
            name: 'Register_Result',
            url: './components/CS0052/CS0052.html',
        },
        // CS0053: {
        //     sprint: 'done',
        //     name: 'Register a Product_Sign Up',
        //     url: './components/CS0053/CS0053.html',
        // },
        // CS0054: {
        //     sprint: 'done',
        //     name: 'Register a Product_Guest',
        //     url: './components/CS0054/CS0054.html',
        // },
        CS0055: {
            sprint: 'done',
            name: 'Register Form_Manually_B2B',
            url: './components/CS0055/CS0055.html',
        },
        CS0056: {
            sprint: 'done',
            name: 'Step_Symptoms',
            url: './components/CS0056/CS0056.html',
        },
        CS0057: {
            sprint: 'done',
            name: 'Step_Contact Info',
            url: './components/CS0057/CS0057.html',
        },
        // CS0058: {
        //     sprint: 'current',
        //     name: 'Repair Request_Visit Schedule',
        //     url: './components/CS0058/CS0058.html',
        // },
        CS0059: {
            sprint: 'done',
            name: 'Step_Review',
            url: './components/CS0059/CS0059.html',
        },
        CS0060: {
            sprint: 'done',
            name: 'Repair Request_Result',
            url: './components/CS0060/CS0060.html',
        },
        CS0061: {
            sprint: 'done',
            name: 'Image Banner',
            url: './components/CS0061/CS0061.html',
        },
        CS0062: {
            sprint: 'done',
            name: 'Right to Repair_Registration_Privacy',
            url: './components/CS0062/CS0062.html',
        },
        CS0063: {
            sprint: 'done',
            name: 'Right to Repair_Registration_Inquiry',
            url: './components/CS0063/CS0063.html',
        },
        CS0064: {
            sprint: 'done',
            name: 'Inquiry Result',
            url: './components/CS0064/CS0064.html',
        },
        CS0065: {
            sprint: 'done',
            name: 'CS Email Us_Privacy',
            url: './components/CS0065/CS0065.html',
        },
        CS0066: {
            sprint: 'done',
            name: 'CS Email Us_Inquiry',
            url: './components/CS0066/CS0066.html',
        },
        // CS0067: {
        //     sprint: 'done',
        //     name: 'Select Registered Product Popup',
        //     url: './components/CS0067/CS0067.html',
        // },
        CS0068: {
            sprint: 'done',
            name: 'Voice to The President_Privacy',
            url: './components/CS0068/CS0068.html',
        },
        CS0069: {
            sprint: 'done',
            name: 'Voice to The President_Inquiry',
            url: './components/CS0069/CS0069.html',
        },
        CS0070: {
            sprint: 'done',
            name: 'Announcement Form',
            url: './components/CS0070/CS0070.html',
        },
        CS0071: {
            sprint: 'done',
            name: 'Track My Repair_Result',
            url: './components/CS0071/CS0071.html',
        },
        CS0072: {
            sprint: 'done',
            name: 'Input Form_Category_B2B',
            url: './components/CS0072/CS0072.html',
        },
        CS0073: {
            sprint: 'done',
            name: 'Input Form_Scan Label_B2B',
            url: './components/CS0073/CS0073.html',
        },
        CS0074: {
            sprint: 'done',
            name: 'Input Form_Scan QR_B2B',
            url: './components/CS0074/CS0074.html',
        },
        CS0075: {
            sprint: 'done',
            name: 'Input Form_Temporarily saved',
            url: './components/CS0075/CS0075.html',
        },
        CS0076: {
            sprint: 'done',
            name: 'Register a Product Popup',
            url: './components/CS0076/CS0076.html',
        },
        CS0077: {
            sprint: 'done',
            name: 'Choose your product Popup',
            url: './components/CS0077/CS0077.html',
        },
        CS0078: {
            sprint: 'current',
            name: 'CS Warranty Consumer',
            url: './components/CS0078/CS0078.html', 
            subtype: 'inline',
            sub: [
                {
                    'name' : 'AT',
                    'file' : 'CS0078-AT.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'NL',
                    'file' : 'CS0078-NL.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CZ',
                    'file' : 'CS0078-CZ.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'DE',
                    'file' : 'CS0078-DE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'IT',
                    'file' : 'CS0078-IT.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CH_de',
                    'file' : 'CS0078-CH_de.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CH_fr',
                    'file' : 'CS0078-CH_fr.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'HU',
                    'file' : 'CS0078-HU.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PL',
                    'file' : 'CS0078-PL.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'FR',
                    'file' : 'CS0078-FR.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'SE',
                    'file' : 'CS0078-SE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'ES',
                    'file' : 'CS0078-ES.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'TR',
                    'file' : 'CS0078-TR.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PT',
                    'file' : 'CS0078-PT.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'EG_en',
                    'file' : 'CS0078-EG_en.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'EG_ar',
                    'file' : '../CS0300/CS0300-EG_ar.html',
                    'dir' : 'rtl',
                },
                {
                    'name' : 'SA_en',
                    'file' : 'CS0078-SA_en.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'SA',
                    'file' : '../CS0301/CS0301-SA.html',
                    'dir' : 'rtl',
                },
                {
                    'name' : 'CA_en',
                    'file' : 'CS0078-CA_en.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CA_fr',
                    'file' : 'CS0078-CA_fr.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'MX',
                    'file' : 'CS0078-MX.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CL',
                    'file' : 'CS0078-CL.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PE',
                    'file' : 'CS0078-PE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'AU',
                    'file' : 'CS0078-AU.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'IN',
                    'file' : 'CS0078-IN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'VN',
                    'file' : 'CS0078-VN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'TH',
                    'file' : 'CS0078-TH.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'KZ',
                    'file' : 'CS0078-KZ.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'TW',
                    'file' : 'CS0078-TW.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'HK',
                    'file' : 'CS0078-HK.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'HK_en',
                    'file' : 'CS0078-HK_en.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CN',
                    'file' : 'CS0078-CN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'JP',
                    'file' : 'CS0078-JP.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'SG',
                    'file' : 'CS0078-SG.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'ID',
                    'file' : 'CS0078-ID.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'BR',
                    'file' : 'CS0078-BR.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CO',
                    'file' : 'CS0078-CO.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CAC',
                    'file' : 'CS0078-CAC.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CAC_en',
                    'file' : 'CS0078-CAC_en.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'BE',
                    'file' : 'CS0078-BE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PH',
                    'file' : 'CS0078-PH.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'NZ',
                    'file' : 'CS0078-NZ.html',
                    'dir' : 'ltr',
                },
            ]
        }, 
        CS0079: {
            sprint: 'done',
            name: 'Accordion Select Category',
            url: './components/CS0079/CS0079.html',
        },
        CS0080: {
            sprint: 'done',
            name: 'Notice bar',
            url: './components/CS0080/CS0080.html',
        },
        CS0081: {
            sprint: 'done',
            name: 'Repair Request_B2B Selector',
            url: './components/CS0081/CS0081.html',
        },
        CS0082: {
            sprint: 'done',
            name: 'Important Popup',
            url: './components/CS0082/CS0082.html',
        },
        // CS0083: {
        //     sprint: 'done',
        //     name: 'Contents List',
        //     url: './components/CS0083/CS0083.html',
        // },
        CS0084: {
            sprint: 'done',
            name: 'Step_Type of Repair',
            url: './components/CS0084/CS0084.html',
        },
        CS0085: {
            sprint: 'done',
            name: 'Step_Attach Documents',
            url: './components/CS0085/CS0085.html',
        },
        CS0086: {
            sprint: 'done',
            name: 'Step_Installation Requirement',
            url: './components/CS0086/CS0086.html',
        },
        CS0087: {
            sprint: 'done',
            name: 'CS Table',
            url: './components/CS0087/CS0087.html',
        },
        CS0088: {
            sprint: 'done',
            name: 'Parts search bar',
            url: './components/CS0088/CS0088.html',
        },
        CS0089: {
            sprint: 'done',
            name: 'CS Image',
            url: './components/CS0089/CS0089.html',
        },
        CS0090: {
            sprint: 'done',
            name: 'CS Vertical Selector',
            url: './components/CS0090/CS0090.html',
        },
        // CS0091: {
        //     sprint: 'done',
        //     name: 'Install-Free Tv Installation',
        //     url: './components/CS0091/CS0091.html',
        // },
        CS0092: {
            sprint: 'done',
            name: 'Magazine',
            url: './components/CS0092/CS0092.html',
        },
        CS0093: {
            sprint: 'done',
            name: 'Energy Consumption Calculator',
            url: './components/CS0093/CS0093.html',
        },
        CS0095: {
            sprint: 'done',
            name: 'Dictionary',
            url: './components/CS0095/CS0095.html',
        },
        // CS0096: {
        //     sprint: 'done',
        //     name: 'Obudsman',
        //     url: './components/CS0096/CS0096.html',
        // },
        CS0098: {
            sprint: 'done',
            name: 'LGPD BR',
            url: './components/CS0098/CS0098.html',
        },
        // CS0102: {
        //     sprint: 'done',
        //     name: 'MD Office',
        //     url: './components/CS0102/CS0102.html',
        // },
        CS0103: {
            sprint: 'done',
            name: 'Call Appointment_find my product',
            url: './components/CS0103/CS0103.html',
        },
        CS0104: {
            sprint: 'done',
            name: 'Call Appointment_product sympton',
            url: './components/CS0104/CS0104.html',
        },
        CS0105: {
            sprint: 'done',
            name: 'Call Appointment_date',
            url: './components/CS0105/CS0105.html',
        },
        CS0106: {
            sprint: 'done',
            name: 'Call Appointment_contact information',
            url: './components/CS0106/CS0106.html',
        },
        CS0107: {
            sprint: 'done',
            name: 'Call Appointment_review',
            url: './components/CS0107/CS0107.html',
        },
        CS0108: {
            sprint: 'done',
            name: 'Support_notice',
            url: './components/CS0108/CS0108.html',
        },
        CS0109: {
            sprint: 'done',
            name: 'Premuim care',
            url: './components/CS0109/CS0109.html',
        },
        CS0110: {
            sprint: 'done',
            name: 'LG Parts Distributor',
            url: './components/CS0110/CS0110.html',
        },
        // CS0111: {
        //     sprint: 'done',
        //     name: 'Magazine Detail',
        //     url: './components/CS0111/CS0111.html',
        // },
        CS0112: {
            sprint: 'done',
            name: 'Scan QR Code',
            url: './components/CS0112/CS0112.html',
        },
        // CS0114: {
        //     sprint: 'done',
        //     name: 'Smart Collection',
        //     url: './components/CS0114/CS0114.html',
        // },
        CS0115: {
            sprint: 'done',
            name: 'Step Block',
            url: './components/CS0115/CS0115.html',
        },
        CS0116: {
            sprint: 'done',
            name: 'Blank',
            url: './components/CS0116/CS0116.html',
        },
        CS0117: {
            sprint: 'done',
            name: 'Border',
            url: './components/CS0117/CS0117.html',
        },
        CS0118: {
            sprint: 'done',
            name: 'LG Extended Warranty',
            url: './components/CS0118/CS0118.html',
        },
        CS0119: {
            sprint: 'done',
            name: 'HU Install',
            url: './components/CS0119/CS0119.html',
        },
        CS0120: {
            sprint: 'done',
            name: 'Distributor Access',
            url: './components/CS0120/CS0120.html',
        },
        CS0121: {
            sprint: 'done',
            name: 'JP Live Remote Service',
            url: './components/CS0121/CS0121.html',
        },
        // CS0122: {
        //     sprint: 'done',
        //     name: 'Paid Service Policy',
        //     url: './components/CS0304/CS0304.html',
        // },
        CS0123: {
            sprint: 'done',
            name: 'Repair Type',
            url: './components/CS0123/CS0123.html',
        },
        CS0124: {
            sprint: 'done',
            name: 'Downtime error',
            url: './components/CS0124/CS0124.html',
        },
        // CS0235: {
        //     sprint: 'current',
        //     name: 'CS Warranty Consumer',
        //     name: 'CS Warranty Consumer <a href="./components/CS0235/CS0235-AT.html">AT</a> <a href="./components/CS0235/CS0235-NL.html">NL</a> <a href="./components/CS0235/CS0235-CZ.html">CZ</a> <a href="./components/CS0235/CS0235-DE.html">DE</a> <a href="./components/CS0235/CS0235-IT.html">IT</a> <a href="./components/CS0235/CS0235-CH_de.html">CH_de</a> <a href="./components/CS0235/CS0235-CH_fr.html">CH_fr</a> <a href="./components/CS0235/CS0235-HU.html">HU</a> <a href="./components/CS0235/CS0235-PL.html">PL</a> <a href="./components/CS0235/CS0235-FR.html">FR</a> <a href="./components/CS0235/CS0235-SE.html">SE</a> <a href="./components/CS0235/CS0235-ES.html">ES</a> <a href="./components/CS0235/CS0235-TR.html">TR</a> <a href="./components/CS0235/CS0235-PT.html">PT</a> <a href="./components/CS0235/CS0235-EG_en.html">EG_en</a> <a href="./components/CS0300/CS0300-EG_ar-rtl.html">EG_ar</a> <a href="./components/CS0235/CS0235-SA_en.html">SA_en</a> <a href="./components/CS0301/CS0301-SA-rtl.html">SA</a> <a href="./components/CS0235/CS0235-CA_en.html">CA_en</a> <a href="./components/CS0235/CS0235-CA_fr.html">CA_fr </a> <a href="./components/CS0235/CS0235-MX.html">MX</a> <a href="./components/CS0235/CS0235-CL.html">CL </a> <a href="./components/CS0235/CS0235-PE.html">PE</a> <a href="./components/CS0235/CS0235-AU.html" class="sample">AU</a> <a href="./components/CS0235/CS0235-IN.html" class="sample">IN</a> <a href="./components/CS0235/CS0235-VN.html" class="sample">VN</a> <a href="./components/CS0235/CS0235-TH.html" class="sample">TH</a> <a href="./components/CS0235/CS0235-KZ.html" class="sample">KZ</a> <a href="./components/CS0235/CS0235-TW.html" class="sample">TW</a> <a href="./components/CS0235/CS0235-HK.html" class="sample">HK</a> <a href="./components/CS0235/CS0235-HK_en.html" class="sample">HK_en</a> <a href="./components/CS0235/CS0235-CN.html" class="sample">CN</a> <a href="./components/CS0235/CS0235-JP.html" class="sample">JP</a> <a href="./components/CS0235/CS0235-SG.html" class="sample">SG</a> <a href="./components/CS0235/CS0235-ID.html" class="sample">ID</a> <a href="./components/CS0235/CS0235-BR.html" class="sample">BR</a> <a href="./components/CS0235/CS0235-CAC.html" class="sample">CAC</a> <a href="./components/CS0235/CS0235-CO.html" class="sample">CO</a> <a href="./components/CS0235/CS0235-BE.html" class="sample">BE</a>',
        //     // url: './components/CS0235/CS0235.html', 
        // },
        CS0236: {
            sprint: 'current',
            name: 'Warranty_Business',
            url: './components/CS0236/CS0236.html',
            subtype: 'inline',
            sub: [
                {
                    'name' : 'DE',
                    'file' : 'CS0236-DE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'IN',
                    'file' : 'CS0236-IN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CN',
                    'file' : 'CS0236-CN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CA_en',
                    'file' : 'CS0236-CA_en.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CA_fr',
                    'file' : 'CS0236-CA_fr.html',
                    'dir' : 'ltr',
                },
            ]
        },
    },
    AL: {
        AL1: {
            sprint: '',
            name: 'About LG 랜딩페이지',
            url: './components/AL1/AL1.html',
            old: '',
        },
        AL_career: {
            sprint: '',
            name: 'Career',
            url: './components/AL2/AL2.html',
            old: '',
        },
        AL_Sustainability: {
            sprint: '',
            name: 'Sustainability',
            url: './components/AL3/AL3.html',
            old: '',
        },
        AL0001: {
            theme: true,
            sprint: '',
            name: 'About Newsroom (List)',
            url: './components/AL0001/AL0001.html',
            old: '',
        },
        AL0002: {
            sprint: '',
            name: 'Newsroom (Detail)',
            url: './components/AL0002/AL0002.html',
            old: '',
        },
        AL0003: {
            sprint: '',
            name: 'Business Video Resource - Detail',
            url: './components/AL0003/AL0003.html',
            old: '',
        },
        AL0004: {
            sprint: '',
            name: 'Event List',
            url: './components/AL0004/AL0004.html',
            old: '',
        },
        AL0005: {
            sprint: '',
            name: 'Find a Job - Detail ',
            url: './components/AL0005/AL0005.html',
            old: '',
            sub: [
                {
                    'name' : 'Download popup',
                    'file' : 'AL0005_0.html',
                },
                {
                    'name' : '일본 동의약관 팝업',
                    'file' : 'AL0005_1.html',
                    'dir' : 'ltr',
                },
            ]
        },
        AL0006: {
            sprint: '',
            name: 'Sustainability File Download',
            url: './components/AL0006/AL0006.html',
            old: '',
        },
        AL0007: {
            sprint: '',
            name: 'Chart(Google API)',
            url: './components/AL0007/AL0007.html',
            old: '',
        },
        AL0008: {
            sprint: '',
            name: 'RU Newsletter subscription',
            url: './components/AL0008/AL0008.html',
            old: '',
            sub: [
                {
                    'name' : 'RU Newsletter subscription_popup',
                    'file' : 'AL0008_0.html',
                    'dir' : 'ltr',
                },
            ]
        },
        AL0009: {
            sprint: '',
            name: 'Event Timeline',
            url: './components/AL0009/AL0009.html',
            old: '',
        },
        AL0011: {
            sprint: '',
            name: 'JP Press Release',
            url: './components/AL0011/AL0011.html',
            old: '',
        },
        AL0012: {
            sprint: '',
            name: 'Find a Job - List',
            url: './components/AL0012/AL0012.html',
            old: '',
        },
        AL0013: {
            sprint: '',
            name: 'News Clipping',
            url: './components/AL0013/AL0013.html',
            old: '',
        },
        AL0014: {
            sprint: '',
            name: 'Career latest job list',
            url: './components/AL0014/AL0014.html',
            old: '',
        },
        AL0015: {
            sprint: '',
            name: 'Career Email to a friend',
            url: './components/AL0015/AL0015.html',
            old: '',
        },
        AL0016: {
            sprint: '',
            name: 'Career Business area',
            url: './components/AL0016/AL0016.html',
            old: '',
        },
        AL0017: {
            sprint: '',
            name: 'Career text block',
            url: './components/AL0017/AL0017.html',
            old: '',
        },
        AL0018: {
            sprint: '',
            name: 'Career People at LG',
            url: './components/AL0018/AL0018.html',
            old: '',
        },
        AL0019: {
            sprint: '',
            name: 'Career Profiles',
            url: './components/AL0019/AL0019.html',
            old: '',
        },
        AL0020: {
            sprint: '',
            name: 'Career Popup',
            url: './components/AL0020/AL0020.html',
            old: '',
        },
        AL0021: {
            sprint: '',
            name: 'Everything About LG',
            url: './components/AL0021/AL0021.html',
            old: '',
        },
        AL0022: {
            sprint: '',
            name: 'More from Global',
            url: './components/AL0022/AL0022.html',
            old: '',
        },
    },
    ML: {
        ML000A: {
            sprint: '',
            name: 'MyLG-index (Landing template)',
            url: './components/ML000A/ML000A.html',
            old: '',
            sub: [
                {
                    'name' : 'My LG landing for non-OBS',
                    'file' : 'ML000A_1.html',
                },
            ],
        },
        ML0100: {
            sprint: '',
            name: 'Dashboard',
            url: './components/ML000A/ML0100.html',
            old: '',
        },
        ML000B: {
            sprint: '',
            name: '[MyOrder] My Order (list), Cancel order',
            url: './components/ML000B/ML000B.html',
            old: '',
        },
        ML000C: {
            sprint: '',
            name: '[MyOrder] Return detail',
            url: './components/ML000C/ML000C.html',
            old: '',
            sub: [
                {
                    'name' : 'Exchange detail',
                    'file' : 'ML000C-ED.html',
                },
            ]
        },
        ML000D: {
            sprint: '',
            name: '[MyOrder] Order details, Return item, Iinvoice',
            url: './components/ML000D/ML000D.html',
            old: 'RO_CN',
            sub: [
                {
                    'name' : 'CA Payment',
                    'file' : 'ML000D-CA.html',
                },
                {
                    'name' : 'PA Payment',
                    'file' : 'ML000D-PA.html',
                }, 
                {
                    'name' : 'IN Order details',
                    'file' : 'ML000D-IN.html',
                },
                {
                    'name' : 'cancel order popup',
                    'file' : 'ML000D-POP.html',
                },
                {
                    'name' : 'invoice popup',
                    'file' : 'ML000D-InvoicePOP.html',
                },
                {
                    'name' : 'ES Invoice',
                    'file' : 'ML000D-ES.html',
                },   
                {
                    'name' : 'CZ Order details',
                    'file' : 'ML000D-CZ.html',
                },     
                {
                    'name' : 'PL Order details',
                    'file' : 'ML000D-PL.html',
                },    
                {
                    'name' : 'Return Item Popup',
                    'file' : 'ML000D-ReturnItemPOP.html',
                },   
                {
                    'name' : 'BR Order details',
                    'file' : 'ML000D-BR.html',
                },
                {
                    'name' : 'VN Order details',
                    'file' : 'ML000D-VN.html',
                },
                {
                    'name' : 'SE Order details',
                    'file' : 'ML000D-SE.html',
                },    
                {
                    'name' : 'AU Order details',
                    'file' : 'ML000D-AU.html',
                },    
            ]
        },
        ML000E: {
            sprint: '',
            name: '[MyOrder] Create return',
            url: './components/ML000E/ML000E.html',
            old: 'RO_CN',
            sub: [
                {
                    'name' : 'Create New Exchange',
                    'file' : 'ML000E-CE.html',
                },
            ]
        },
        ML000F: {
            sprint: '',
            name: '[MyOrder] My repair request',
            url: './components/ML000F/ML000F.html',
            old: '',
        },
        ML000G: {
            sprint: '',
            name: 'Repair Details',
            url: './components/ML000G/ML000G.html',
            old: '',
        },
        ML000H: {
            sprint: '',
            name: 'My Product',
            url: './components/ML000H/ML000H.html',
            old: '',
        },
        ML000I: {
            sprint: '',
            name: 'Product Details',
            url: './components/ML000I/ML000I.html',
            old: 'RO_IT, RO_SG, RO_CA_EN, RO_CA_FR',
        },
        ML000J: {
            sprint: '',
            name: 'My wishlist',
            url: './components/ML000J/ML000J.html',
            old: '',
        },
        ML000K: {
            sprint: '',
            name: 'Warranty extended preview',
            url: './components/ML000K/ML000K.html',
            old: '',
        },
        // [Start] 2023-06-05 : UPDATE - change text
        ML000L: {
            sprint: '',
            name: 'My Enquiries',
            url: './components/ML000L/ML000L.html',
            old: '',
        },
        // [End] 2023-06-05 : UPDATE - change text
        ML000M: {
            sprint: '',
            name: 'Inquiry details',
            url: './components/ML000M/ML000M.html',
            old: '',
        },
        ML000N: {
            sprint: '',
            name: 'My Account',
            url: './components/ML000N/ML000N.html',
            old: '',
            sub: [
                {
                    'name' : 'My account for non-OBS',
                    'file' : 'ML000N_2.html',
                },
            ],
        },
        ML000O: {
            sprint: '',
            name: 'Edit Profile',
            url: './components/ML000O/ML000O.html',
            old: '',
            sub: [
                {
                    'name' : 'Edit Profile - RO Fullcase',
                    'file' : 'ML000O_1.html',
                },
                {
                    'name' : 'Edit Profile - Input Password',
                    'file' : 'ML000O_2.html',
                },
                {
                    'name' : 'Edit Profile - RO JP',
                    'file' : 'ML000O_JP.html',
                },
            ]
        },
        ML000P: {
            sprint: '',
            name: 'Change Password',
            url: './components/ML000P/ML000P.html',
            old: '',
        },
        ML000Q: {
            sprint: '',
            name: 'VIP Upgrade',
            url: './components/ML000Q/ML000Q.html',
            old: '',
            sub: [
                {
                    'name' : 'ML000Q-RTE',
                    'file' : 'ML000Q-RTE.html',
                },
            ]
        },
        ML000R: {
            sprint: '',
            name: 'MyLG Addresses',
            url: './components/ML000R/ML000R.html',
            old: '',
            sub: [
                {
                    'name' : 'ML000R-IT',
                    'file' : 'ML000R-IT.html',
                },
            ]
        },
        ML000S: {
            sprint: '',
            name: 'Shipping addresses, Billing addresses, Edit default shipping address',
            url: './components/ML000S/ML000S.html',
            old: '',
            sub: [
              {
                  'name' : 'ML000S-JP',
                  'file' : 'ML000S-JP.html',
              },
          ]
        },
        ML000T: {
            sprint: '',
            name: 'Delete My Account',
            url: './components/ML000T/ML000T.html',
            old: '',
        },
        ML000U: {
            sprint: '',
            name: 'My points',
            url: './components/ML000U/ML000U.html',
            old: '',
        },
        ML000V: {
            sprint: '',
            name: 'Coupon list',
            url: './components/ML000V/ML000V.html',
            old: '',
            subtype: 'inline',
            sub: [
                {
                    'name' : 'My coupon list-EG',
                    'file' : 'ML000V_1.html',
                },
            ]
        },
        ML000W: {
            sprint: '',
            name: 'Track my order',
            url: './components/ML000W/ML000W.html',
            old: '',
        },
        ML000X: {
            sprint: '',
            name: 'PW check to confirm account update',
            url: './components/ML000X/ML000X.html',
            old: '',
        },
        ML000Y: {
            sprint: '',
            name: 'View Profile',
            url: './components/ML000Y/ML000Y.html',
            old: '',
            subtype: 'inline',
            sub: [
                {
                    'name' : 'IT',
                    'file' : 'ML000Y_it.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'ES',
                    'file' : 'ML000Y_es.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'HU',
                    'file' : 'ML000Y_hu.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PL',
                    'file' : 'ML000Y_pl.html',
                    'dir' : 'ltr',
                },
            ]
        },
        ML000Z: {
            sprint: 'current',
            name: 'My review',
            url: './components/ML000Z/ML000Z.html',
            old: '',
        },
        ML00AA: {
            sprint: '',
            name: 'Address book',
            url: './components/ML00AA/ML00AA.html',
            old: '',
        },
        ML00AB: {
            sprint: '',
            name: 'Tax Info',
            url: './components/ML00AB/ML00AB.html',
            old: '',
        },
        ML0101: {
            sprint: '',
            name: 'Email confirmation - new order',
            url: './components/MLEmail/ML0101.html',
            old: '',
        },        
        ML0102: {
            sprint: '',
            name: 'Invoice email',
            url: './components/MLEmail/ML0102.html',
            old: '',
        },
        ML0103: {
            sprint: '',
            name: 'Order Cancel',
            url: './components/MLEmail/ML0103.html',
            old: '',
        },
        ML0104: {
            sprint: '',
            name: 'New Shipment',
            url: './components/MLEmail/ML0104.html',
            old: '',
        },
        ML0105: {
            sprint: '',
            name: 'New RMA',
            url: './components/MLEmail/ML0105.html',
            old: '',
        },
        ML0106: {
            sprint: '',
            name: 'Return Request Authrized',
            url: './components/MLEmail/ML0106.html',
            old: '',
        },
        ML0107: {
            sprint: '',
            name: 'New Credit memo',
            url: './components/MLEmail/ML0107.html',
            old: '',
        },
        ML0108: {
            sprint: '',
            name: 'Payment Failed Alert',
            url: './components/MLEmail/ML0108.html',
            old: '',
        },
        ML0109: {
            sprint: '',
            name: 'Delivery Status Alert - On hold 1',
            url: './components/MLEmail/ML0109.html',
            old: '',
        },
        ML0110: {
            sprint: '',
            name: 'Delivery Status Alert - On hold 2',
            url: './components/MLEmail/ML0110.html',
            old: '',
        },
        ML0111: {
            sprint: '',
            name: 'Delivery Status Alert- Preparing for delivery',
            url: './components/MLEmail/ML0111.html',
            old: '',
        },
        ML0112: {
            sprint: '',
            name: 'Delivery Status Alert - Picking for delivery',
            url: './components/MLEmail/ML0112.html',
            old: '',
        },
        ML0113: {
            sprint: '',
            name: 'Delivery Status Alert - Delivery Completed',
            url: './components/MLEmail/ML0113.html',
            old: '',
        },
        ML0114: {
            sprint: '',
            name: 'RMA Admin Comments',
            url: './components/MLEmail/ML0114.html',
            old: '',
        },
        ML0115: {
            sprint: '',
            name: 'Shipment Comment and Update',
            url: './components/MLEmail/ML0115.html',
            old: '',
        },
        ML0116: {
            sprint: '',
            name: 'Order Comment and Update',
            url: './components/MLEmail/ML0116.html',
            old: '',
        },
        ML0117: {
            sprint: '',
            name: 'Credit Memo Comment and Update',
            url: './components/MLEmail/ML0117.html',
            old: '',
        },
        ML0118: {
            sprint: '',
            name: 'Cart Abandonment',
            url: './components/MLEmail/ML0118.html',
            old: '',
        },
        ML0119: {
            sprint: '',
            name: 'Email Footer & Header',
            url: './components/MLEmail/ML0119.html',
            old: '',
        },
        ML0120: {
            sprint: '',
            name: 'Cart re-stocked Alert',
            url: './components/MLEmail/ML0120.html',
            old: '',
        },
        ML0121: {
            sprint: '',
            name: 'Low stock notification',
            url: './components/MLEmail/ML0121.html',
            old: '',
        },
        ML0122: {
            sprint: '',
            name: 'Out of stock notification',
            url: './components/MLEmail/ML0122.html',
            old: '',
        },
        ML0123: {
            sprint: '',
            name: 'Price about to expire alert',
            url: './components/MLEmail/ML0123.html',
            old: '',
        },
        ML0124: {
            sprint: '',
            name: 'Product disabled due to expiration of pricing',
            url: './components/MLEmail/ML0124.html',
            old: '',
        },
        ML0125: {
            sprint: '',
            name: 'Wishlist Back in stock',
            url: './components/MLEmail/ML0125.html',
            old: '',
        },
        ML0126: {
            sprint: '',
            name: 'Wishlist On sale',
            url: './components/MLEmail/ML0126.html',
            old: '',
        },
        ML0130: {
            sprint: '',
            name: 'Customer Survey',
            url: './components/MLEmail/ML0130.html',
            old: '',
        },
        ML0131: {
            sprint: '',
            name: 'Remind Purchase',
            url: './components/MLEmail/ML0131.html',
            old: '',
        },
        ML0132: {
            sprint: '',
            name: 'Remind Review',
            url: './components/MLEmail/ML0132.html',
            old: '',
        },
        ML0133: {
            sprint: '',
            name: 'Promotion notify me',
            url: './components/MLEmail/ML0133.html',
            old: '',
        },
        ML0134: {
            sprint: '',
            name: 'Time delay reminder',
            url: './components/MLEmail/ML0134.html',
            old: '',
        },
        ML0135: {
            sprint: '',
            name: 'Points Expiration Email',
            url: './components/MLEmail/ML0135.html',
            old: '',
        },
        ML0136: {
            sprint: '',
            name: 'Earning From Order Email',
            url: './components/MLEmail/ML0136.html',
            old: '',
        },
        ML0137: {
            sprint: '',
            name: 'Balance update',
            url: './components/MLEmail/ML0137.html',
            old: '',
        },
        ML0138: {
            sprint: 'current',
            name: 'Select Shop Package',
            url: './components/MLEmail/ML0138.html',
            old: '',
        },
        ML0139: {
            sprint: '',
            name: 'PD0045.In House Review - Approval Email',
            url: './components/MLEmail/ML0139.html',
            old: '',
        },
        ML0140: {
            sprint: '',
            name: 'PD0045.In House Review - Denial Email',
            url: './components/MLEmail/ML0140.html',
            old: '',
        },
        ML0141: {
            sprint: '',
            name: 'PD0045.In House Review - Alert Email',
            url: './components/MLEmail/ML0141.html',
            old: '',
        },
        ML0142: {
            sprint: '',
            name: 'Verification Email',
            url: './components/MLEmail/ML0142.html',
            old: '',
        },
        ML0143: {
            sprint: '',
            name: 'Subscription Confirm Email',
            url: './components/MLEmail/ML0143.html',
            old: '메일폼 뉴스룸 전용 양식 다름',
        },
        ML0144: {
            sprint: '',
            name: 'Repair Registration Email (Corp)',
            url: './components/MLEmail/ML0144.html',
            old: '',
        },
        ML0145: {
            sprint: '',
            name: 'Repair Registration Email (Customer)',
            url: './components/MLEmail/ML0145.html',
            old: '',
        },
        ML0146: {
            sprint: '',
            name: 'Verify your LG Account',
            url: './components/MLEmail/ML0146.html',
            old: '',
        },
        // ML0001: {
        //     sprint: 'current',
        //     name: 'MyLG-index',
        //     url: './components/ML0001/ML-Landing.html',
        //     old: '',
        // },
        // ML0002: {
        //     sprint: 'current',
        //     name: 'MyLG - My Orders List',
        //     url: './components/ML0002/ML-OrdersList.html',
        //     old: '',
        // },
        // ML0003: {
        //     sprint: 'current',
        //     name: 'MyLG - My Orders List (empty)',
        //     url: './components/ML0003/ML-MyOrderListEmpty.html',
        //     old: '',
        // },
        // ML0004: {
        //     sprint: 'current',
        //     name: 'MyLG - Order Details',
        //     url: './components/ML0004/ML-OrderDetails.html',
        //     old: '',
        // },
        // ML0006: {
        //     sprint: 'current',
        //     name: 'Item Details',
        //     url: './components/ML0006/ML-ItemDetails.html',
        //     old: '',
        // },
        // ML0008: {
        //     sprint: 'current',
        //     name: 'Item Details(Cancel)',
        //     url: './components/ML0008/ML-ItemDetailsCancel.html',
        //     old: '',
        // },
        // ML0010: {
        //     sprint: 'current',
        //     name: 'Create New Return',
        //     url: './components/ML0010/ML-CreateNewReturn.html',
        //     old: '',
        // },
        // ML0049: {
        //     sprint: 'current',
        //     name: 'Create New Return (address edit)',
        //     url: './components/ML0049/ML-CreateNewReturnAddressEdit.html',
        //     old: '',
        // },
        // ML0011: {
        //     sprint: 'current',
        //     name: 'Create New Return(Exchange)',
        //     url: './components/ML0011/ML-CreateNewReturnExchange.html',
        //     old: '',
        // },
        // ML0012: {
        //     sprint: 'current',
        //     name: 'Item Details(Return)',
        //     url: './components/ML0012/ML-ItemDetailsReturn.html',
        //     old: '',
        // },
        // ML0013: {
        //     sprint: 'current',
        //     name: 'My repair request',
        //     url: './components/ML0013/ML-MyRepairRequest.html',
        //     old: '',
        // },
        // ML0050: {
        //     sprint: 'current',
        //     name: 'Repair Details',
        //     url: './components/ML0050/ML-RepairDetails.html',
        //     old: '',
        // },
        // ML0014: {
        //     sprint: 'current',
        //     name: 'My Product(Empty page)',
        //     url: './components/ML0014/ML-MyProductEmptyPage.html',
        //     old: '',
        // },
        // ML0015: {
        //     sprint: 'current',
        //     name: 'My Product List',
        //     url: './components/ML0015/ML-MyProductList.html',
        //     old: '',
        // },
        // ML0016: {
        //     sprint: 'current',
        //     name: 'Product Information',
        //     url: './components/ML0016/ML-ProductInformation.html',
        //     old: '',
        // },
        // ML0018: {
        //     sprint: 'current',
        //     name: 'Register Product(Enter Manually)',
        //     url: './components/ML0018/ML-RegisterProductEnterManually.html',
        //     old: '',
        // },
        // ML0019: {
        //     sprint: 'current',
        //     name: 'Register Product(Select by Category)',
        //     url: './components/ML0019/ML-RegisterProductSelectbyCategory.html',
        //     old: '',
        // },
        // ML0052: {
        //     sprint: 'current',
        //     name: 'Warranty extended STEP 1',
        //     url: './components/ML0052/ML-WarrantyExtendedSTEP1.html',
        //     old: '',
        // },
        // ML0053: {
        //     sprint: 'current',
        //     name: 'Warranty extended STEP 2',
        //     url: './components/ML0053/ML-WarrantyExtendedSTEP2.html',
        //     old: '',
        // },
        // ML0054: {
        //     sprint: 'current',
        //     name: 'Warranty extended STEP 3',
        //     url: './components/ML0054/ML-WarrantyExtendedSTEP3.html',
        //     old: '',
        // },
        // ML0055: {
        //     sprint: 'current',
        //     name: 'Warranty extended preview',
        //     url: './components/ML0055/ML-WarrantyExtendedPreview.html',
        //     old: '',
        // },
        // ML0027: {
        //     sprint: 'current',
        //     name: 'My Inquiries',
        //     url: './components/ML0027/ML-MyInquiries.html',
        //     old: '',
        // },
        // ML0029: {
        //     sprint: 'current',
        //     name: 'My Inquiries(empty)',
        //     url: './components/ML0029/ML-MyInquiriesEmpty.html',
        //     old: '',
        // },
        // ML0030: {
        //     sprint: 'current',
        //     name: 'My Inquiries_complete',
        //     url: './components/ML0030/ML-MyInquiriesComplete.html',
        //     old: '',
        // },
        // ML0051: {
        //     sprint: 'current',
        //     name: 'My Inquiries_Receipt',
        //     url: './components/ML0051/ML-MyInquiriesReceipt.html',
        //     old: '',
        // },
        // ML0031: {
        //     sprint: 'current',
        //     name: 'My Account',
        //     url: './components/ML0031/ML-MyAccount.html',
        //     old: '',
        // },
        // ML0032: {
        //     sprint: 'current',
        //     name: 'Edit Profile',
        //     url: './components/ML0032/ML-EditProfile.html',
        //     old: '',
        // },
        // ML0033: {
        //     sprint: 'current',
        //     name: 'Change Password',
        //     url: './components/ML0033/ML-ChangePassword.html',
        //     old: '',
        // },
        // ML0034: {
        //     sprint: 'current',
        //     name: 'Change Password (Filled)',
        //     url: './components/ML0034/ML-ChangePasswordFilled.html',
        //     old: '',
        // },
        // ML0035: {
        //     sprint: 'current',
        //     name: 'VIP Upgrade',
        //     url: './components/ML0035/ML-VIPUpgrade.html',
        //     old: '',
        // },
        // ML0036: {
        //     sprint: 'current',
        //     name: 'VIP Upgrade (Submit)',
        //     url: './components/ML0036/ML-VIPUpgradeSubmit.html',
        //     old: '',
        // },
        // ML0038: {
        //     sprint: 'current',
        //     name: 'Addresses',
        //     url: './components/ML0038/ML-Addresses.html',
        //     old: '',
        // },
        // ML0039: {
        //     sprint: 'current',
        //     name: 'New Shipping Address',
        //     url: './components/ML0039/ML-NewShippingAddress.html',
        //     old: '',
        // },
        // ML0040: {
        //     sprint: 'current',
        //     name: 'New Shipping Address (Filled)',
        //     url: './components/ML0040/ML-NewShippingAddressFilled.html',
        //     old: '',
        // },
        // ML0041: {
        //     sprint: 'current',
        //     name: 'Edit Shipping Address',
        //     url: './components/ML0041/ML-EditShippingAddress.html',
        //     old: '',
        // },
        // ML0044: {
        //     sprint: 'current',
        //     name: 'Delete My Account',
        //     url: './components/ML0044/ML-DeleteMyAccount.html',
        //     old: '',
        // },
        // ML0045: {
        //     sprint: 'current',
        //     name: 'Rewards page, Rewards page(empty)',
        //     url: './components/ML0045/ML-RewardsPage.html',
        //     old: '',
        // },
        // ML0047: {
        //     sprint: 'current',
        //     name: 'Coupon list',
        //     url: './components/ML0047/ML-CouponList.html',
        //     old: '',
        // },
        // ML0048: {
        //     sprint: 'current',
        //     name: 'My History',
        //     url: './components/ML0048/ML-MyHistory.html',
        //     old: '',
        // },
        // ML0056: {
        //     sprint: 'current',
        //     name: 'My reviews',
        //     url: './components/ML0056/ML-MyReviews.html',
        //     old: '',
        // },
        // ML0057: {
        //     sprint: 'current',
        //     name: 'My reviews (empty)',
        //     url: './components/ML0057/ML-MyReviewsEmpty.html',
        //     old: '',
        // },
    },
    CT: {
        CT000A: {
            sprint: '',
            name: 'Cart Template',
            url: './components/CT000A/CT000A.html',
            old: '',
            subtype: 'inline',
            sub: [
                {
                    'name' : 'DE',
                    'file' : 'CT000A-DE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'IT',
                    'file' : 'CT000A-IT.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'FR',
                    'file' : 'CT000A-FR.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'AU',
                    'file' : 'CT000A-AU.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'VN',
                    'file' : 'CT000A-VN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'BR',
                    'file' : 'CT000A-BR.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'MX',
                    'file' : 'CT000A-MX.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CL',
                    'file' : 'CT000A-CL.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'AT',
                    'file' : 'CT000A-AT.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'NL',
                    'file' : 'CT000A-NL.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CZ',
                    'file' : 'CT000A-CZ.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CH_DE',
                    'file' : 'CT000A-CH_DE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'HU',
                    'file' : 'CT000A-HU.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PL',
                    'file' : 'CT000A-PL.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'SE',
                    'file' : 'CT000A-SE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PE',
                    'file' : 'CT000A-PE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PA(CAC_EN)',
                    'file' : 'CT000A-CAC_EN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'EG_EN',
                    'file' : 'CT000A-EG_EN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'IN',
                    'file' : 'CT000A-IN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'TW',
                    'file' : 'CT000A-TW.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CA',
                    'file' : 'CT000A-CA.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'ES',
                    'file' : 'CT000A-ES.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'JP',
                    'file' : 'CT000A-JP.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'ID',
                    'file' : 'CT000A-ID.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CN',
                    'file' : 'CT000A-CN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'HK',
                    'file' : 'CT000A-HK.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'TH',
                    'file' : 'CT000A-TH.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'KZ',
                    'file' : 'CT000A-KZ.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CO',
                    'file' : 'CT000A-CO.html"',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PT',
                    'file' : 'CT000A-PT.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'SA_EN',
                    'file' : 'CT000A-SA.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'SA_RTL',
                    'file' : 'CT000A-SA.html',
                    'dir' : 'rtl',
                },
                {
                    'name' : 'TR',
                    'file' : 'CT000A-TR.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'SG',
                    'file' : 'CT000A-SG.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PH',
                    'file' : 'CT000A-PH.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'ZA',
                    'file' : 'CT000A-ZA.html',
                    'dir' : 'ltr',
                },
                // {
                //     'name' : 'PA',
                //     'file' : 'CT000A-PA.html',
                //     'dir' : 'ltr',
                // },
            ]
        },
        CT0100: {
            sprint: '',
            name: 'Basket list with Total',
            url: './components/CT000A/CT0100.html',
            old: '',
        },
        CT0101: {
            sprint: '',
            name: 'You may also like',
            url: './components/CT000A/CT0101.html',
            old: '',
        },
        CT0102: {
            sprint: '',
            name: 'A better way to shop with LG',
            url: './components/CT000A/CT0102.html',
            old: '',
        },
        CT000B: {
            sprint: '',
            name: 'Cart Popup',
            url: './components/CT000B/CT000B.html',
            old: '',
        },
        CT0019: {
            sprint: '',
            name: 'Klarna Popup',
            url: './components/CT000B/CT0019.html',
            old: '',
        },
        CT000C: {
            sprint: '',
            name: 'Checkout',
            url: './components/CT000C/CT000C.html',
            old: '',
            subtype: 'inline',
            sub: [
                {
                    'name' : 'DE',
                    'file' : 'CT000C-DE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'IT',
                    'file' : 'CT000C-IT.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'FR',
                    'file' : 'CT000C-FR.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'AU',
                    'file' : 'CT000C-AU.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'VN',
                    'file' : 'CT000C-VN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'BR',
                    'file' : 'CT000C-BR.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'MX',
                    'file' : 'CT000C-MX.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CL',
                    'file' : 'CT000C-CL.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'AT',
                    'file' : 'CT000C-AT.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'NL',
                    'file' : 'CT000C-NL.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CZ',
                    'file' : 'CT000C-CZ.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CH_DE',
                    'file' : 'CT000C-CH_DE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'HU',
                    'file' : 'CT000C-HU.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PL',
                    'file' : 'CT000C-PL.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'SE',
                    'file' : 'CT000C-SE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PE',
                    'file' : 'CT000C-PE.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PA(CAC_EN)',
                    'file' : 'CT000C-CAC_EN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'EG_EN',
                    'file' : 'CT000C-EG_EN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'EG_RTL',
                    'file' : 'CT000C-EG_EN.html',
                    'dir' : 'rtl',
                },
                {
                    'name' : 'IN',
                    'file' : 'CT000C-IN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'TW',
                    'file' : 'CT000C-TW.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CA',
                    'file' : 'CT000C-CA.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'ES',
                    'file' : 'CT000C-ES.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'JP',
                    'file' : 'CT000C-JP.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'ID',
                    'file' : 'CT000C-ID.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CN',
                    'file' : 'CT000C-CN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'HK',
                    'file' : 'CT000C-HK.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'TH',
                    'file' : 'CT000C-TH.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'KZ',
                    'file' : 'CT000C-KZ.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'CO',
                    'file' : 'CT000C-CO.html"',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PT',
                    'file' : 'CT000C-PT.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'SA_EN',
                    'file' : 'CT000C-SA.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'SA_RTL',
                    'file' : 'CT000C-SA.html',
                    'dir' : 'rtl',
                },
                {
                    'name' : 'TR',
                    'file' : 'CT000C-TR.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'SG',
                    'file' : 'CT000C-SG.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'PH',
                    'file' : 'CT000C-PH.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'ZA',
                    'file' : 'CT000C-ZA.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'GSM',
                    'file' : 'CT000C-GSM.html',
                    'dir' : 'ltr',
                },
                // {
                //     'name' : 'PA',
                //     'file' : 'CT000C-PA.html',
                //     'dir' : 'ltr',
                // },
            ]
        },
        // CT000C_10: {
        //     sprint: 'current',
        //     name: 'Checkout Step1',
        //     url: './components/CT000C/CT000C_10.html',
        //     old: 'CT0030'
        // },
        // CT000C_20: {
        //     sprint: 'current',
        //     name: 'Checkout Step2',
        //     url: './components/CT000C/CT000C_20.html',
        //     old: 'CT0014'
        // },
        // CT000C_21: {
        //     sprint: 'current',
        //     name: 'Checkout Step2 Guest',
        //     url: './components/CT000C/CT000C_21.html',
        //     old: 'CT0014'
        // },
        // CT000C_30: {
        //     sprint: 'current',
        //     name: 'Checkout Step3',
        //     url: './components/CT000C/CT000C_30.html',
        //     old: 'CT0020, CT0021'
        // },
        CT0300: {
            sprint: '',
            name: 'Checkout Guest TabPanel',
            url: './components/CT000C/CT0300.html',
            old: '',
        },
        CT0301: {
            sprint: '',
            name: 'Checkout Step1',
            url: './components/CT000C/CT0301.html',
            old: '',
        },
        CT0302: {
            sprint: '',
            name: 'Checkout Step2',
            url: './components/CT000C/CT0302.html',
            old: '',
        },
        CT0303: {
            sprint: '',
            name: 'Checkout Step3',
            url: './components/CT000C/CT0303.html',
            old: '',
        },
        CT0304: {
            sprint: '',
            name: 'Checkout Guest Tab',
            url: './components/CT000C/CT0304.html',
            old: '',
        },
        CT000D: {
            sprint: '',
            name: 'Checkout Order Confirm Template',
            url: './components/CT000D/CT000D.html',
            old: '',
            subtype: 'inline',
            sub: [
                {
                    'name' : 'JP',
                    'file' : 'CT000D-JP.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'IN',
                    'file' : 'CT000D-IN.html',
                    'dir' : 'ltr',
                },
                {
                    'name' : 'MX',
                    'file' : 'CT000D-MX.html',
                    'dir' : 'ltr',
                },
            ]
        },
        CT0400: {
            sprint: '',
            name: 'Thank You For',
            url: './components/CT000D/CT0400.html',
            old: '',
        },
        CT0401: {
            sprint: '',
            name: 'Your order',
            url: './components/CT000D/CT0401.html',
            old: '',
        },
        CT0402: {
            sprint: '',
            name: 'Guest Login Banner',
            url: './components/CT000D/CT0402.html',
            old: '',
        },
        CT0403: {
            sprint: '',
            name: 'Leave feedback',
            url: './components/CT000D/CT0403.html',
            old: '',
        },
        CT000E: {
            sprint: '',
            name: 'Checkout Login',
            url: './components/CT000E/CT000E.html',
            old: '',
        },
        CT000F: {
            sprint: '',
            name: 'Checkout Popup',
            url: './components/CT000F/CT000F.html',
            old: '',
        },
        // CT0001: {
        //     sprint: 'current',
        //     name: 'Member Cart. Basket full case',
        //     url: './components/CT0001/CT-Landing.html',
        //     old: '',
        // },
        // CT0002: {
        //     sprint: 'current',
        //     name: 'Member Cart. Basket Coupon',
        //     url: './components/CT0002/CT-BasketCoupon.html',
        //     old: '',
        // },
        // CT0019: {
        //     sprint: 'current',
        //     name: 'Klarna popup',
        //     url: './components/CT0019/CT-KlarnaPopup.html',
        //     old: '',
        // },
        // CT0018: {
        //     sprint: 'current',
        //     name: 'Add accessory popup',
        //     url: './components/CT0018/CT-AddAccessoryPopup.html',
        //     old: '',
        // },
        // CT0004: {
        //     sprint: 'current',
        //     name: 'Member Cart. Basket Accessory products',
        //     url: './components/CT0004/CT-BasketAccessoryProducts.html',
        //     old: '',
        // },
        // CT0031: {
        //     sprint: 'current',
        //     name: 'Add Bundle Popup',
        //     url: './components/CT0031/CT-AddBundlePopup.html',
        //     old: '',
        // },
        // CT0005: {
        //     sprint: 'current',
        //     name: 'Member Cart. Basket PTO',
        //     url: './components/CT0005/CT-BasketPto.html',
        //     old: '',
        // },
        // CT0006: {
        //     sprint: 'current',
        //     name: 'Member Cart. Add on Bundle product case1',
        //     url: './components/CT0006/CT-AddOnBundleCase1.html',
        //     old: '',
        // },
        // CT0007: {
        //     sprint: 'current',
        //     name: 'Member Cart. Add on Bundle product case2',
        //     url: './components/CT0007/CT-AddOnBundleCase2.html',
        //     old: '',
        // },
        // CT0016: {
        //     sprint: 'current',
        //     name: 'Add to Basket Popup',
        //     url: './components/CT0016/CT-AddToBasketPopUp.html',
        //     old: '',
        // },
        // CT0017: {
        //     sprint: 'current',
        //     name: 'ZIP Code Popup',
        //     url: './components/CT0017/CT-ZIPCodePopup.html',
        //     old: '',
        // },
        // CT0028: {
        //     sprint: 'current',
        //     name: 'Member Cart. Empty Basket',
        //     url: './components/CT0028/CT-MemberCartEmpty.html',
        //     old: '',
        // },
        // CT0025: {
        //     sprint: 'current',
        //     name: 'Basket Warranty',
        //     url: './components/CT0025/CT-BasketWarranty.html',
        //     old: '',
        // },
        // CT0008: {
        //     sprint: 'current',
        //     name: 'Guest Cart. Cart',
        //     url: './components/CT0008/CT-GuestCart.html',
        //     old: '',
        // },
        // CT0009: {
        //     sprint: 'current',
        //     name: 'Guest Cart. Cart Empty',
        //     url: './components/CT0009/CT-GuestCartEmpty.html',
        //     old: '',
        // },
        // CT0011: {
        //     sprint: 'current',
        //     name: 'Member Checkout. Step1 Shipping1',
        //     url: './components/CT0011/CT-CheckoutStep1Ship1.html',
        //     old: '',
        // },
        // CT0012: {
        //     sprint: 'current',
        //     name: 'Member Checkout. Step1 Shipping2 (Same for billing adress 체크시  Billing Address 비활성화된 상태 (When Same for billing adress checked,  Billing Address is disabled state))',
        //     url: './components/CT0012/CT-CheckoutStep1Ship2.html',
        //     old: '',
        // },
        // CT0013: {
        //     sprint: 'current',
        //     name: 'Member Checkout. Step1 Shipping3',
        //     url: './components/CT0013/CT-CheckoutStep1Ship3.html',
        //     old: '',
        // },
        // CT0030: {
        //     sprint: 'current',
        //     name: 'Step 1 : Order info & coupon',
        //     url: './components/CT0030/CT-OrderInfoCoupon.html',
        //     old: '',
        // },
        // CT0014: {
        //     sprint: 'current',
        //     name: 'Member Checkout. Step2 Delivery',
        //     url: './components/CT0014/CT-CheckoutStep2.html',
        //     old: '',
        // },
        // CT0020: {
        //     sprint: 'current',
        //     name: 'Member Checkout. Step3 Payment',
        //     url: './components/CT0020/CT-CheckoutStep3Payment1.html',
        //     old: '',
        // },
        // CT0021: {
        //     sprint: 'current',
        //     name: 'Member Checkout. Checkout Preview',
        //     url: './components/CT0021/CT-CheckoutPreview.html',
        //     old: '',
        // },
        // CT0022: {
        //     sprint: 'current',
        //     name: 'Member Checkout. Order Confirm',
        //     url: './components/CT0022/CT-OrderConfirm.html',
        //     old: '',
        // },
        // CT0023: {
        //     sprint: 'current',
        //     name: 'Guest Checkout. Step1 As a guest',
        //     url: './components/CT0023/CT-GuestShip1.html',
        //     old: '',
        // },
        // CT0024: {
        //     sprint: 'current',
        //     name: 'Guest Checkout. Step1 Im a member',
        //     url: './components/CT0024/CT-GuestShip2.html',
        //     old: '',
        // },
        // CT0026: {
        //     sprint: 'current',
        //     name: 'Member Cart. ZIP code 미확인 국가(ZIP code unknown country) ',
        //     url: './components/CT0026/CT-ZipcodeNo.html',
        //     old: '',
        // },
        // CT0027: {
        //     sprint: 'current',
        //     name: 'Member Cart. ZIP code 확인 국가(ZIP code verification country)',
        //     url: './components/CT0027/CT-ZipcodeYes.html',
        //     old: '',
        // },
        // CT0029: {
        //     sprint: 'current',
        //     name: '비회원 로그인',
        //     url: './components/CT0029/CT-Login.html',
        //     old: '',
        // },
        // CT0030_1: {
        //     sprint: 'current',
        //     name: 'Use Coupon Popup',
        //     url: './components/CT0030_1/CT-UseCouponPopUp.html',
        //     old: '',
        // },
        // CT0030_2: {
        //     sprint: 'current',
        //     name: 'Select Coupon Popup',
        //     url: './components/CT0030_2/CT-SelectCouponPopUp.html',
        //     old: '',
        // },
        // CT0030_3: {
        //     sprint: 'current',
        //     name: 'New Address Popup',
        //     url: './components/CT0030_3/CT-NewAddressPopUp.html',
        //     old: '',
        // },
        // CT0030_4: {
        //     sprint: 'current',
        //     name: 'Find Address Popup',
        //     url: './components/CT0030_4/CT-FindAddressPopUp.html',
        //     old: '',
        // },
        // CT0030_5: {
        //     sprint: 'current',
        //     name: 'Another Address Popup',
        //     url: './components/CT0030_5/CT-AnotherAddressPopUp.html',
        //     old: '',
        // },
        // CT_Component: {
        //     sprint: 'current',
        //     name: 'Components',
        //     url: './components/CT1000/_shipping_address.html',
        //     old: '',
        // },
    },
    MB: {
        MB000A: {
            sprint: '',
            name: '',
            name: `
            Sign in
            <a href="./components/MB000A/MB000A-SG.html" class="sample">SG</a>,
            <a href="./components/MB000A/MB000A-ES.html" class="sample">ES</a>,
            `,
            url: './components/MB000A/MB000A.html',
            old: '',
            sub: [
                {
                    'name' : 'Sign in for non-OBS',
                    'file' : 'MB000A_1.html',
                },
            ],
        },
        MB000B: {
            sprint: '',
            name: 'Reset Password, Time out Popup',
            url: './components/MB000B/MB000B.html',
            old: '',
        },
        MB000C: {
            sprint: '',
            name: 'Third Party Service, Social Media Account Connection',
            url: './components/MB000C/MB000C.html',
            old: '',
        },
        MB000D: {
            sprint: '',
            name: 'Create Account',
            url: './components/MB000D/MB000D.html',
            old: '',
            sub: [
                {
                    'name' : 'Verify Your LG.Com Account',
                    'file' : 'MB000D_1.html',
                },
                {
                    'name' : 'Verify Your LG.Com Account (NZ none-OBS)' ,
                    'file' : 'MB000D_1_NZ.html',
                },
                {
                    'name' : 'Verify Your LG.Com Account(Mail)',
                    'file' : 'MB000D_2.html',
                },
                {
                    'name' : 'Verification is invalid',
                    'file' : 'MB000D_3.html',
                },
                {
                    'name' : 'DOI email (Mail)',
                    'file' : 'MB000D_4.html',
                },
                {
                    'name' : 'DOI completion (fail)',
                    'file' : 'MB000D_5.html',
                },
                {
                    'name' : 'DOI completion (success)',
                    'file' : 'MB000D_6.html',
                },
            ]
        },
        MB000E: {
            sprint: '',
            name: 'Guest Checkout',
            url: './components/MB000E/MB000E.html',
            old: '',
        },
        MB000F: {
            sprint: '',
            name: 'Block & Resend message',
            url: './components/MB000F/MB000F.html',
            old: '',
        },
        MB000G: {
            sprint: '',
            name: 'Forgot Password',
            url: './components/MB000G/MB000G.html',
            old: '',
            sub:[{
                'name': 'Password set (ES only)',
                'file':'MB000G_1.html',
            }],
        },
        // MB0001: {
        //     sprint: '',
        //     name: 'Sign in',
        //     url: './components/MB0001/MB-SignIn.html',
        //     old: '',
        // },
        // MB0002: {
        //     sprint: 'current',
        //     name: 'Sign in (Error)',
        //     url: './components/MB0002/MB-SignInError.html',
        //     old: '',
        // },
        // MB0003: {
        //     sprint: 'current',
        //     name: 'Sign in_Captcha',
        //     url: './components/MB0003/MB-SignInCaptcha.html',
        //     old: '',
        // },
        // MB0004: {
        //     sprint: 'current',
        //     name: 'Sign in_Captcha (Error)',
        //     url: './components/MB0004/MB-SignInCaptchaError.html',
        //     old: '',
        // },
        MB000H: {
            sprint: '',
            name: 'Change Password Guide',
            url: './components/MB000H/MB000H.html',
            old: '',
        },
        // MB0006: {
        //     sprint: 'current',
        //     name: 'Block & Resend message',
        //     url: './components/MB0006/MB-BlockResendMessage.html',
        //     old: '',
        // },
        // MB0007: {
        //     sprint: 'current',
        //     name: 'Block & Resend message (Error)',
        //     url: './components/MB0007/MB-BlockResendMessageError.html',
        //     old: '',
        // },
        // MB0008: {
        //     sprint: 'current',
        //     name: 'Forgot Password',
        //     url: './components/MB0008/MB-ForgotPassword.html',
        //     old: '',
        // },
        // MB0009: {
        //     sprint: 'current',
        //     name: 'Forgot Password (Error)',
        //     url: './components/MB0009/MB-ForgotPasswordError.html',
        //     old: '',
        // },
        // MB0010: {
        //     sprint: 'current',
        //     name: 'Forgot Password (Change Password)',
        //     url: './components/MB0010/MB-ForgotPasswordChangePassword.html',
        //     old: '',
        // },
        // MB0011: {
        //     sprint: 'current',
        //     name: 'Reset Password',
        //     url: './components/MB0011/MB-ResetPassword.html',
        //     old: '',
        // },
        // MB0012: {
        //     sprint: 'current',
        //     name: 'Reset Password (Error)',
        //     url: './components/MB0012/MB-ResetPasswordError.html',
        //     old: '',
        // },
        MB000I: {
            sprint: '',
            name: 'Reset Password (Complete)',
            url: './components/MB000I/MB000I.html',
            old: '',
        },
        MB000J: {
            sprint: '',
            name: 'Account Intergration',
            url: './components/MB000J/MB000J.html',
            old: '',
            sub: [
                {
                    'name' : 'Account Intergration full case',
                    'file' : 'MB000J_1.html',
                },
            ]
        },
        MB000K: {
            sprint: '',
            name: 'B2B Sign Up',
            url: './components/MB000K/MB000K.html',
            old: '',
            sub: [
                {
                    'name' : 'B2B VIP verification code sent pop-up',
                    'file' : 'MB000K_1.html',
                },
                {
                    'name' : 'VIP verification code email',
                    'file' : 'MB000K_2.html',
                },
            ]
        },
        MB000L: {
            sprint: '',
            name: 'Sign up - Agree',
            url: './components/MB000L/MB000L.html',
            old: '',
        },
        // MB0014: {
        //     sprint: 'current',
        //     name: 'Time out Popup',
        //     url: './components/MB0014/MB-TimeOutPopup.html',
        //     old: '',
        // },
        // MB0015: {
        //     sprint: 'current',
        //     name: 'Third party service - Email validation​',
        //     url: './components/MB0015/MB-ThirdPartyServiceEmailValidation.html',
        //     old: '',
        // },
        // MB0016: {
        //     sprint: 'current',
        //     name: 'Third party service - Email validation​ (Error)',
        //     url: './components/MB0016/MB-ThirdPartyServiceEmailValidationError.html',
        //     old: '',
        // },
        // MB0017: {
        //     sprint: 'current',
        //     name: 'Third party service - Email validation​ (Case1)',
        //     url: './components/MB0017/MB-ThirdPartyServiceEmailValidationCase1.html',
        //     old: '',
        // },
        // MB0018: {
        //     sprint: 'current',
        //     name: 'Third party service - Email validation​ (Case2)',
        //     url: './components/MB0018/MB-ThirdPartyServiceEmailValidationCase2.html',
        //     old: '',
        // },
        // MB0019: {
        //     sprint: 'current',
        //     name: 'Create Account',
        //     url: './components/MB0019/MB-CreateAccount.html',
        //     old: '',
        // },
        // MB0020: {
        //     sprint: 'current',
        //     name: 'Create Account (Error)',
        //     url: './components/MB0020/MB-CreateAccountError.html',
        //     old: '',
        // },
        // MB0021: {
        //     sprint: 'current',
        //     name: 'Create Account (Toast Popup)',
        //     url: './components/MB0021/MB-CreateAccountToastPopup.html',
        //     old: '',
        // },
        // MB000J: {
        //     sprint: 'current',
        //     name: 'Privacy Policy Popup',
        //     url: './components/MB0022/MB-PrivacyPolicyPopup.html',
        //     old: 'MB0022',
        // },
    },
    ETC: {
        ETC000A: {
            sprint: '',
            name: 'Jeong-do Management Main [FIn]',
            url: './components/ETC000A/ETC000A.html',
            old: '',
            sub: [
                {
                    'name' : 'Jeong-do Management Main popup',
                    'file' : 'ETC000A_0.html',
                },
                {
                    'name' : 'ES Jeong-do Management Main [FIn]',
                    'file' : 'ETC000A_es.html',
                },
            ]
        },
        ETC000C: {
            sprint: '',
            name: 'Reporting Unethical [FIn]',
            url: './components/ETC000C/ETC000C.html',
            old: '',
            sub: [
                {
                    'name' : 'Offer to Management [FIn]',
                    'file' : 'ETC000C_1.html',
                },
                {
                    'name' : 'Tab 상단 ES CASE',
                    'file' : 'ETC000C_es.html',
                },                
                {
                    'name' : 'Tab 상단 Infomation [FIn]',
                    'file' : 'ETC000C_fr.html',
                },
            ]
        },
        ETC000D: {
            sprint: '',
            name: 'Check report : pre [Fin]',
            url: './components/ETC000D/ETC000D.html',
            old: '',
            sub: [
                {
                    'name' : 'Check report : result [FIn]',
                    'file' : 'ETC000D_1.html',
                },
                {
                    'name' : 'ES Check report : pre [Fin]',
                    'file' : 'ETC000D_es.html',
                },
            ]
        },
        ETC000E: {
            sprint: '',
            name: 'Newsletter subscription (뉴스레터 구독 신청)',
            url: './components/ETC000E/ETC000E.html',
            old: '',
        },
        ETC000F: {
            sprint: '',
            name: 'Newsletter subscription done (뉴스레터 구독 신청완료)',
            url: './components/ETC000F/ETC000F.html',
            old: '',
        },
        ETC000G: {
            sprint: '',
            name: 'Newsletter  Unsubscribe (뉴스레터 구독 해지신청)',
            url: './components/ETC000G/ETC000G.html',
            old: '',
        },
        ETC000H: {
            sprint: '',
            name: 'Newsletter  Unsubscribe done (뉴스레터 구독 해지신청완료)',
            url: './components/ETC000H/ETC000H.html',
            old: '',
        },
        ETC000I: {
            sprint: '',
            name: 'Brandshop (IN, ID)',
            url: './components/ETC000I/ETC000I.html',
            old: '',
        },
    },
    GN: {
        GN0001: {
            sprint: '',
            name: 'Newsroom Main',
            url: './components/GN0001/GN0001.html',
            old: '',
        },
        GN0002: {
            sprint: '',
            name: 'Multimedia',
            url: './components/GN0002/GN0002.html',
            old: '',
        },
        GN0003: {
            sprint: '',
            name: 'Press Kits',
            url: './components/GN0003/GN0003.html',
            old: '',
        },
        GN0004: {
            sprint: '',
            name: 'Subscribe/Unsubscribe',
            url: './components/GN0004/GN0004.html',
            old: '',
        },
        GN0005: {
            sprint: '',
            name: 'Press List',
            url: './components/GN0005/GN0005.html',
            old: '',
        },
        GN0006: {
            sprint: '',
            name: 'Search Results',
            url: './components/GN0006/GN0006.html',
            old: '',
        },
        GN0007: {
            sprint: '',
            name: 'Press Detail',
            url: './components/GN0007/GN0007.html',
            old: '',
        },
        GN0008: {
            sprint: '',
            name: 'Recommended Article',
            url: './components/GN0008/GN0008.html',
            old: '',
        },
        GN0009: {
            sprint: '',
            name: 'Press Image Gallery',
            url: './components/GN0009/GN0009.html',
            old: '',
        },
    },
    MULTI: {
        PD0002M: {
            sprint: '',
            name: `[MULTI] Selective Offering`,
            url: './components/PD0002M/PD0002M.html',
        },
        PD0003M: {
            sprint: '',
            name: `[MULTI] Product Summary`,
            url: './components/PD0003M/PD0003M.html',
        },
        ST0025M: {
            sprint: '',
            name: `[MULTI] FAQ`,
            url: './components/ST0025M/ST0025M.html',
        },
        MB000M: {
            sprint: '',
            name: `[MULTI] Verify Student member group`,
            url: './components/MB000M/MB000M.html',
        },
        ML0100M: {
            sprint: '',
            name: `[MULTI] Education member`,
            url: './components/ML000A/ML0100M.html',
        },
        ML000VM: {
            sprint: '',
            name: `[MULTI] My Coupons`,
            url: './components/ML000VM/ML000VM.html',
        },
    },
};

// print component list
const list = document.getElementById('guideList');
if (typeof pageList == 'object' && list) {
    let html = '<ul>';
    const pageType = list.dataset.type;
    if (!!pageType) {
        const clist = pageList[pageType];
        const keys = Object.keys(clist);
        const lenAll = keys.length;
        const countArea = document.querySelector('.component-count');
        if (countArea) {
            countArea.innerHTML = 'Count : ' + lenAll;
        }
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const name = clist[key].name;
            const url = clist[key].url;
            const old = clist[key].old;
            const theme = clist[key].theme;
            const sub = clist[key].sub;
            const subtype = clist[key].subtype;
            // const coding = clist[key].coding;
            // const plan = clist[key].plan;
            // const design = clist[key].design;
            const sprint = clist[key].sprint ? clist[key].sprint : 0;
            if (sprint == 'current') {
                html = html + '<li class="current">';
            } else if (sprint == 'done') {
                html = html + '<li class="done">';
            } else {
                html = html + '<li>';
            }
            // if (!!theme && theme === true) {
            //     html = html + '<div class="cid can-theme">' + key + '.</div>';
            // } else{
            //     html = html + '<div class="cid">' + key + '.</div>';
            // }
            html = html + '<div class="cid">' + key + '.</div>';
            html = html + '<div class="name">';
            if (!!url) {
                html = html + '<a href="' + url + '">LTR</a>';
                html = html + '<a href="' + url.replace('.html', '-rtl.html') + '">RTL</a>';
                html = html + name;
            } else {
                html = html + name;
            }
            if (!!old) {
                const arrayOld = old.split(',');
                let oldText = '';
                arrayOld.forEach(el => {
                    oldText =
                        oldText +
                        '<a href="https://wwwstg.lg.com/lg5-common-gp/html/components/' +
                        el.trim() +
                        '.html" target="_blank">' +
                        el +
                        '</a>';
                });
                html = html + '<div class="old">' + oldText + '</div>';
            }
            if(!!sub) {
                html = html + '<div class="sub">';
                sub.forEach( (p, idx) => {
                    if(idx !== 0) {
                        if(!!subtype && subtype === 'inline') {
                        } else {
                            html = html + '<br/>';
                        }
                    }
                    if(!!subtype && subtype === 'inline') {
                        if (!!p.dir && p.dir === 'ltr') {
                            html = html + '<div class="nowrap"><a href="./components/' + key + '/' + p.file + '">' + p.name + '</a><span>LTR</span></div>';
                        } else if (!!p.dir && p.dir === 'rtl') {
                            html = html + '<div class="nowrap"><a href="./components/' + key + '/' + p.file.replace('.html', '-rtl.html') + '">' + p.name + '</a><span>RTL</span></div>';
                        } else {
                            html = html + '<div class="nowrap">';
                            html = html + '<a href="./components/' + key + '/' + p.file + '">LTR</a>';
                            html = html + '<a href="./components/' + key + '/' + p.file.replace('.html', '-rtl.html') + '">RTL</a>';
                            html = html + p.name;
                            html = html + '</div>';
                        }

                    } else {
                        if (!!p.dir && p.dir === 'ltr') {
                            html = html + '<a href="./components/' + key + '/' + p.file + '">LTR</a>';
                        } else if (!!p.dir && p.dir === 'rtl') {
                            html = html + '<a href="./components/' + key + '/' + p.file.replace('.html', '-rtl.html') + '">RTL</a>';
                        } else {
                            html = html + '<a href="./components/' + key + '/' + p.file + '">LTR</a>';
                            html = html + '<a href="./components/' + key + '/' + p.file.replace('.html', '-rtl.html') + '">RTL</a>';
                        }
                        html = html + p.name;
                    }
                });
                html = html + '</div>';
            } 
            html = html + '</div>';
            html = html + '</span>';
        }
    }
    html = html + '</ul>';
    list.innerHTML = html;

    $(list)
        .find('a')
        .on('click', function () {
            if (!$(this).attr('target') || $(this).attr('target') != '_blank') {
                const url = $(this).attr('href');
                const tit = $(this).html();
                $.cookie('LIST_URL', url, { path: '/' });
                $.cookie('LIST_TITLE', tit, { path: '/' });
            }
            return true;
        });
}

// print options
const printOptions = function () {
    let html = '';
    const olist = guideList;
    const keys = Object.keys(olist);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        html = html + '<div class="guide-column">';
        html = html + '<div class="target">' + key + '</div>';
        html = html + '<div class="guide-item">';
        for (let j = 0; j < olist[key].length; j++) {
            const name = olist[key][j].name;
            const buttons = olist[key][j].buttons;
            const target = olist[key][j].buttons[0].target;
            html = html + '<div class="guide-item-option">';
            html = html + '<span>' + name;
            if (!!target && target == 'parent') html = html + ' (Parent)';
            html = html + ' : </span>';
            for (let k = 0; k < buttons.length; k++) {
                const toggle = buttons[k].toggle;
                const addClass = buttons[k].add;
                const removeClass = buttons[k].remove;
                if (toggle) {
                    if (!!target) {
                        html =
                            html +
                            '<button type="button" class="type-toggle" onclick="guideToggleBtn(\'' +
                            key +
                            "', '" +
                            addClass +
                            "', '" +
                            'undefined' +
                            "', '" +
                            target +
                            '\');">' +
                            addClass +
                            '</button> ';
                    } else {
                        html =
                            html +
                            '<button type="button" class="type-toggle" onclick="guideToggleBtn(\'' +
                            key +
                            "', '" +
                            addClass +
                            '\');">' +
                            addClass +
                            '</button> ';
                    }
                } else {
                    if (!!target) {
                        html =
                            html +
                            '<button type="button" class="type-select" onclick="guideToggleBtn(\'' +
                            key +
                            "', '" +
                            addClass +
                            "', '" +
                            removeClass +
                            "', '" +
                            target +
                            '\');">' +
                            addClass +
                            '</button> ';
                    } else {
                        html =
                            html +
                            '<button type="button" class="type-select" onclick="guideToggleBtn(\'' +
                            key +
                            "', '" +
                            addClass +
                            "', '" +
                            removeClass +
                            '\');">' +
                            addClass +
                            '</button> ';
                    }
                }
            }
            html = html + '</div>';
        }
        html = html + '</div>';
        html = html + '</div>';
    }
    const target = document.querySelector('.guide-wrapper');
    if (target) target.innerHTML = html;
};
if (typeof guideList == 'object') printOptions();

// Add a close button to the guide area
const guideArea = document.querySelector('.guide');
const appendCloseBtn = function () {
    const closeBtn = '<a href="#" class="close"><span>Close</span><span>Options</span></a>';
    const targetEl = guideArea.querySelector('.guide-list');
    if (targetEl) {
        targetEl.insertAdjacentHTML('beforeend', closeBtn);
        const closeEl = targetEl.querySelector('a.close');
        closeEl.addEventListener('click', function () {
            event.preventDefault();
            // guideArea.remove();
            guideArea.classList.toggle('collapse');
        });
    }
};
const controlHover = function () {
    guideArea.style.zIndex = 9999;
    guideArea.addEventListener('mouseover', function () {
        guideArea.style.zIndex = 9999;
    });
    guideArea.addEventListener('mouseout', function () {
        guideArea.removeAttribute('style');
    });
};
if (guideArea) {
    appendCloseBtn();
    // controlHover();
}

// Checking for UI layout & font-style
(function(){
    const siteList = [
        {localeCode: 'global', dataCountrycode: 'global', dir: 'ltr', lang: 'en', countryName: 'Global (global)'},
        {localeCode: 'be_fr', dataCountrycode: 'be_fr', dir: 'ltr', lang: 'fr', countryName: 'Belgium (be_fr)'},
        {localeCode: 'nl', dataCountrycode: 'nl', dir: 'ltr', lang: 'nl', countryName: 'Netherlands (nl)'},
        {localeCode: 'de', dataCountrycode: 'DE', dir: 'ltr', lang: 'de-DE', countryName: 'Germany (de)'},
        {localeCode: 'gr', dataCountrycode: 'gr', dir: 'ltr', lang: 'el', countryName: 'Greece (gr)'},
        {localeCode: 'it', dataCountrycode: 'it', dir: 'ltr', lang: 'it', countryName: 'Italy (it)'},
        {localeCode: 'pl', dataCountrycode: 'pl', dir: 'ltr', lang: 'pl', countryName: 'Poland (pl)'},
        {localeCode: 'pt', dataCountrycode: 'PT', dir: 'ltr', lang: 'pt-PT', countryName: 'Portugal (pt)'},
        {localeCode: 'uk', dataCountrycode: 'GB', dir: 'ltr', lang: 'en-GB', countryName: 'UK (uk)'},
        {localeCode: 'mx', dataCountrycode: 'mx', dir: 'ltr', lang: 'es', countryName: 'Mexico (mx)'},
        {localeCode: 'fr', dataCountrycode: 'fr', dir: 'ltr', lang: 'fr', countryName: 'France (fr)'},
        {localeCode: 'es', dataCountrycode: 'es', dir: 'ltr', lang: 'es', countryName: 'Spain (es)'},
        {localeCode: 'at', dataCountrycode: 'at', dir: 'ltr', lang: 'de', countryName: 'Austria (at)'},
        {localeCode: 'ch_de', dataCountrycode: 'ch_de', dir: 'ltr', lang: 'de-CH', countryName: 'Switzerland (ch_de)'},
        {localeCode: 'ch_fr', dataCountrycode: 'ch_fr', dir: 'ltr', lang: 'fr-CH', countryName: 'Switzerland (ch_fr)'},
        {localeCode: 'sk', dataCountrycode: 'sk', dir: 'ltr', lang: 'sk', countryName: 'Slovakia (sk)'},
        {localeCode: 'cz', dataCountrycode: 'cz', dir: 'ltr', lang: 'cs', countryName: 'Republic (cz)'},
        {localeCode: 'hr', dataCountrycode: 'hr', dir: 'ltr', lang: 'hr', countryName: 'Croatia (hr)'},
        {localeCode: 'bg', dataCountrycode: 'bg', dir: 'ltr', lang: 'bg', countryName: 'Bulgaria (bg)'},
        {localeCode: 'hu', dataCountrycode: 'hu', dir: 'ltr', lang: 'hu', countryName: 'Hungary (hu)'},
        {localeCode: 'rs', dataCountrycode: 'rs', dir: 'ltr', lang: 'sr', countryName: 'Serbia (rs)'},
        {localeCode: 'ro', dataCountrycode: 'ro', dir: 'ltr', lang: 'ro', countryName: 'Romania (ro)'},
        {localeCode: 'dk', dataCountrycode: 'dk', dir: 'ltr', lang: 'da', countryName: '(dk )'},
        {localeCode: 'fi', dataCountrycode: 'fi', dir: 'ltr', lang: 'fi', countryName: 'Finland (fi)'},
        {localeCode: 'no', dataCountrycode: 'no', dir: 'ltr', lang: 'no', countryName: 'Norway (no)'},
        {localeCode: 'se', dataCountrycode: 'se', dir: 'ltr', lang: 'sv', countryName: 'Sweden (se)'},
        {localeCode: 'in', dataCountrycode: 'in', dir: 'ltr', lang: 'en', countryName: 'India (in)'},
        {localeCode: 'br', dataCountrycode: 'br', dir: 'ltr', lang: 'pt', countryName: 'Brazil (br)'},
        {localeCode: 'co', dataCountrycode: 'co', dir: 'ltr', lang: 'es', countryName: 'Colombia (co)'},
        {localeCode: 'pe', dataCountrycode: 'pe', dir: 'ltr', lang: 'es', countryName: 'Peru (pe)'},
        {localeCode: 'cac_en', dataCountrycode: 'cac_en', dir: 'ltr', lang: 'es', countryName: 'Panama (cac_en)'},
        {localeCode: 'cac', dataCountrycode: 'cac', dir: 'ltr', lang: 'es', countryName: 'Panama (cac)'},
        {localeCode: 'ec', dataCountrycode: 'ec', dir: 'ltr', lang: 'es', countryName: 'Ecuador (ec)'},
        {localeCode: 'au', dataCountrycode: 'au', dir: 'ltr', lang: 'en', countryName: 'Australia (au)'},
        {localeCode: 'nz', dataCountrycode: 'nz', dir: 'ltr', lang: 'en', countryName: 'Zealand (nz)'},
        {localeCode: 'kz', dataCountrycode: 'KZ', dir: 'ltr', lang: 'ru-KZ', countryName: 'Kazakhstan (kz)'},
        {localeCode: 'ee', dataCountrycode: 'ee', dir: 'ltr', lang: 'et', countryName: 'Estonia (ee)'},
        {localeCode: 'lt', dataCountrycode: 'lt', dir: 'ltr', lang: 'lt', countryName: 'Lithuania (lt)'},
        {localeCode: 'lv', dataCountrycode: 'lv', dir: 'ltr', lang: 'lv', countryName: 'Latvia (lv)'},
        {localeCode: 'ru', dataCountrycode: 'ru', dir: 'ltr', lang: 'ru', countryName: 'Russia (ru)'},
        {localeCode: 'ua', dataCountrycode: 'ua', dir: 'ltr', lang: 'uk', countryName: 'Ukraine (ua)'},
        {localeCode: 'ca_en', dataCountrycode: 'CA', dir: 'ltr', lang: 'en-CA', countryName: 'Canada (ca_en)'},
        {localeCode: 'ca_fr', dataCountrycode: 'CA', dir: 'ltr', lang: 'fr-CA', countryName: 'Canada (ca_fr)'},
        {localeCode: 'ar', dataCountrycode: 'ar', dir: 'ltr', lang: 'es', countryName: 'Argentina (ar)'},
        {localeCode: 'cl', dataCountrycode: 'cl', dir: 'ltr', lang: 'es', countryName: 'Chile (cl)'},
        {localeCode: 'cn', dataCountrycode: 'cn', dir: 'ltr', lang: 'zh', countryName: '(cn )'},
        {localeCode: 'hk', dataCountrycode: 'hk', dir: 'ltr', lang: 'zh-HK', countryName: 'Kong (hk)'},
        {localeCode: 'hk_en', dataCountrycode: 'hk_en', dir: 'ltr', lang: 'en-HK', countryName: 'Kong (hk_en)'},
        {localeCode: 'tw', dataCountrycode: 'tw', dir: 'ltr', lang: 'zh', countryName: 'Taiwan (tw)'},
        {localeCode: 'id', dataCountrycode: 'id', dir: 'ltr', lang: 'id', countryName: 'Indonesia (id)'},
        {localeCode: 'ph', dataCountrycode: 'ph', dir: 'ltr', lang: 'en', countryName: 'Philippine (ph)'},
        {localeCode: 'sg', dataCountrycode: 'SG', dir: 'ltr', lang: 'en-SG', countryName: 'Singapore (sg)'},
        {localeCode: 'th', dataCountrycode: 'TH', dir: 'ltr', lang: 'th-TH', countryName: 'Thailand (th)'},
        {localeCode: 'vn', dataCountrycode: 'vn', dir: 'ltr', lang: 'vi', countryName: 'Vietnam (vn)'},
        {localeCode: 'my', dataCountrycode: 'my', dir: 'ltr', lang: 'en', countryName: 'Malaysia (my)'},
        {localeCode: 'lk', dataCountrycode: 'lk', dir: 'ltr', lang: 'en', countryName: 'Lanka (lk)'},
        {localeCode: 'jp', dataCountrycode: 'JP', dir: 'ltr', lang: 'ja-JP', countryName: 'Japan (jp)'},
        {localeCode: 'dz', dataCountrycode: 'dz', dir: 'ltr', lang: 'fr', countryName: 'Algeria  (dz)'},
        {localeCode: 'africa', dataCountrycode: 'africa', dir: 'ltr', lang: 'en', countryName: 'Nigeria (africa)'},
        {localeCode: 'eg_en', dataCountrycode: 'eg_en', dir: 'ltr', lang: 'en-EG', countryName: 'Egypt (eg_en)'},
        {localeCode: 'eg_ar', dataCountrycode: 'eg_ar', dir: 'rtl', lang: 'ar-EG', countryName: 'Egypt (eg_ar)'},
        {localeCode: 'ae', dataCountrycode: 'ae', dir: 'ltr', lang: 'en-AE', countryName: 'UAE (ae)'},
        {localeCode: 'ae_ar', dataCountrycode: 'ae_ar', dir: 'rtl', lang: 'ar-AE', countryName: 'UAE (ae_ar)'},
        {localeCode: 'ir', dataCountrycode: 'ir', dir: 'rtl', lang: 'fa', countryName: 'Iran (ir)'},
        {localeCode: 'levant_en', dataCountrycode: 'levant_en', dir: 'ltr', lang: 'ar-JO', countryName: 'Jordan (levant_en)'},
        {localeCode: 'levant_ar', dataCountrycode: 'levant_ar', dir: 'rtl', lang: 'ar-JO', countryName: 'Jordan (levant_ar)'},
        {localeCode: 'ma', dataCountrycode: 'ma', dir: 'ltr', lang: 'fr', countryName: 'Morocco (ma)'},
        {localeCode: 'za', dataCountrycode: 'za', dir: 'ltr', lang: 'en', countryName: 'Africa (za)'},
        {localeCode: 'sa_en', dataCountrycode: 'SA', dir: 'ltr', lang: 'en-SA', countryName: 'Arabia (sa_en)'},
        {localeCode: 'sa', dataCountrycode: 'SA', dir: 'rtl', lang: 'ar-SA', countryName: 'Arabia (sa)'},
        {localeCode: 'tr', dataCountrycode: 'tr', dir: 'ltr', lang: 'tr', countryName: 'Turkey (tr)'},
        {localeCode: 'tn', dataCountrycode: 'tn', dir: 'ltr', lang: 'fr', countryName: '(tn )'},
        {localeCode: 'il', dataCountrycode: 'il', dir: 'rtl', lang: 'iw', countryName: 'Israel (il)'},
        {localeCode: 'eastafrica', dataCountrycode: 'eastafrica', dir: 'ltr', lang: 'en', countryName: 'Kenya (eastafrica)'}
    ];
    const html = document.getElementsByTagName('html')[0];

    window.addEventListener('keydown', function(e){
        if(e.ctrlKey == false && e.key == 'F9') {
            // rtl change control
            let currentPageUrl = window.location.href;

            if (currentPageUrl.includes('-rtl.html')) {
                currentPageUrl = currentPageUrl.replace('-rtl.html', '.html');
            } else {
                currentPageUrl = currentPageUrl.replace('.html', '-rtl.html');
            }

            window.location.href = currentPageUrl;
        }
        else if(e.ctrlKey == true && e.key == 'F9') {
            // country change control
            const userInput = prompt('url의 끝부분 locale Code를 입력하세요.(대소문자 구분필요)');
            if (userInput) {
                const selectedCountry = siteList.find(item => item.localeCode === userInput);
                const { dir, lang, dataCountrycode } = selectedCountry;
                html.setAttribute('dir', dir);
                html.setAttribute('lang', lang);
                html.setAttribute('data-countrycode', dataCountrycode);
            }
        }
    });

})();
