export default function defaultEmailTemplate(
  hunterName: string,
  body: string,
  bountyLink: string
) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <!--<![endif]-->
        <!--[if (gte mso 9)|(IE)]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
      body {width: 620px;margin: 0 auto;}
      table {border-collapse: collapse;}
      table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
      img {-ms-interpolation-mode: bicubic;}
    </style>
  <![endif]-->
        <style type="text/css">
      body, p, div {
        font-family: arial,helvetica,sans-serif;
        font-size: 14px;
      }
      body {
        color: #000000;
      }
      body a {
        color: #932A89;
        text-decoration: none;
      }
      p { margin: 0; padding: 0; }
      table.wrapper {
        width:100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      ul ul ul ul  {
        list-style-type: disc !important;
      }
      ol ol {
        list-style-type: lower-roman !important;
      }
      ol ol ol {
        list-style-type: lower-latin !important;
      }
      ol ol ol ol {
        list-style-type: decimal !important;
      }
      @media screen and (max-width:480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
          text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 100% !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        .social-icon-column {
          display: inline-block !important;
        }
      }
    </style>
        <!--user entered Head Start--><!--End Head user entered-->
      </head>
      <body>
        <center class="wrapper" data-link-color="#932A89" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#f0f0f0;">
          <div class="webkit">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#f0f0f0">
              <tr>
                <td valign="top" bgcolor="#f0f0f0" width="100%">
                  <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="100%">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td>
                              <!--[if mso]>
      <center>
      <table><tr><td width="620">
    <![endif]-->
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:620px;" align="center">
                                        <tr>
                                          <td role="modules-container" style="padding:0px 10px 0px 10px; color:#000000; text-align:left;" bgcolor="#F0F0F0" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
      <tr>
        <td role="module-content">
          <p></p>
        </td>
      </tr>
    </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:30px 0px 10px 0px;" bgcolor="#F0F0F0" data-distribution="1,1">
      <tbody>
        <tr role="module-content">
          <td height="100%" valign="top"><table width="300" style="width:300px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
        <tbody>
          <tr>
            <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b61e00de-19e5-4f73-9ecc-b8ea4f872e5c">
      <tbody>
        <tr>
          <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="left">
            <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:80% !important; width:80%; height:auto !important;" width="240" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/c31721ac5f4f8b45/082250be-8224-4641-b338-2776e2d8f703/3042x325.png">
          </td>
        </tr>
      </tbody>
    </table></td>
          </tr>
        </tbody>
      </table><table width="300" style="width:300px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-1">
        <tbody>
          <tr>
            <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="1444ebb1-667b-4c9d-a9a5-5bf0e36fcce8">
      <tbody>
        <tr>
          <td style="padding:0px 0px 4px 0px;" role="module-content" bgcolor="">
          </td>
        </tr>
      </tbody>
    </table></td>
          </tr>
        </tbody>
      </table></td>
        </tr>
      </tbody>
   <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:50px 20px 50px 20px;" bgcolor="#3172a3" data-distribution="1">
      <tbody>
        <tr role="module-content">
          <td height="100%" valign="top"><table width="460" style="width:460px; border-spacing:0; border-collapse:collapse; margin:0px 50px 0px 50px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
        <tbody>
          <tr>
            <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="efe5a2c4-1b11-49e7-889d-856d80b40f63" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="padding:40px 0px 30px 0px; line-height:36px; text-align:inherit; background-color:#4f46e5;" height="100%" valign="top" bgcolor="#74bcd9" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 46px; color: #ffffff; font-family: &quot;trebuchet ms&quot;, helvetica, sans-serif"><strong>Bounty</strong></span></div><div></div></div></td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="efe5a2c4-1b11-49e7-889d-856d80b40f63.2" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="padding:50px 30px 30px 30px; line-height:28px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="font-size: 20px; font-family: &quot;trebuchet ms&quot;, helvetica, sans-serif; color: #656565">Hi ${hunterName},</span></div>
  <div style="font-family: inherit; text-align: inherit"><br></div>
  <div style="font-family: inherit; text-align: inherit"><span style="font-size: 20px; font-family: &quot;trebuchet ms&quot;, helvetica, sans-serif; color: black">${body}</span></div><div></div></div></td>
        </tr>
      </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="d0bf6998-834d-4cc3-b775-8e43e7fcbf90">
        <tbody>
          <tr>
            <td align="left" bgcolor="#FFFFFF" class="outer-td" style="padding:0px 0px 0px 30px; background-color:#FFFFFF;">
              <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                <tbody>
                  <tr>
                  <td align="center" bgcolor="#932A89" class="inner-td" style="border-radius:6px;  padding-bottom: 40px; font-size:16px; text-align:left; background-color:inherit;">
                    <a href="${bountyLink}" style="background-color:#4f46e5; border:0px solid #333333; border-color:#4f46e5 border-radius:1px; border-width:0px; color:#ffffff; display:inline-block; font-size:16px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:15px 25px 15px 25px; text-align:center; text-decoration:none; border-style:solid; font-family:trebuchet ms,helvetica,sans-serif;" target="_blank">Go to Bounty</a>
                  </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table></td>
          </tr>
        </tbody>
      </table></td>
        </tr>
      </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:0px 20px 0px 20px;" bgcolor="#D488CC" data-distribution="1">
      <tbody>
        <tr role="module-content">
          <td height="100%" valign="top"><table width="440" style="width:440px; border-spacing:0; border-collapse:collapse; margin:0px 60px 0px 60px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
        <tbody>
          <tr>
            <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="13d36c46-b515-4bdf-ad3c-edafb5c1c151.1" data-mc-module-version="2019-10-22">

    </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="13d36c46-b515-4bdf-ad3c-edafb5c1c151.1.1" data-mc-module-version="2019-10-22">
     
    </table></td>
          </tr>
        </tbody>
      </table></td>
        </tr>
      </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:40px 0px 1px 0px;" bgcolor="#F0F0F0" data-distribution="1">
      <tbody>
        <tr role="module-content">
          <td height="100%" valign="top"><table width="580" style="width:580px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
        <tbody>
          <tr>
            <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="social" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="da66730a-c885-4e7b-bda0-4df5c4f2ce23">
      <tbody>
        <tr>
          <td valign="top" style="padding:0px 0px 0px 0px; font-size:6px; line-height:10px;" align="center">
            <table align="center" style="-webkit-margin-start:auto;-webkit-margin-end:auto;">
              <tbody><tr align="center"><td style="padding: 0px 5px;" class="social-icon-column">
        <a role="social-icon-link" href="https://www.facebook.com/sendgrid/" target="_blank" alt="Facebook" title="Facebook" style="display:inline-block; background-color:#9D9D9D; height:21px; width:21px;">
          <img role="social-icon" alt="Facebook" title="Facebook" src="https://mc.sendgrid.com/assets/social/white/facebook.png" style="height:21px; width:21px;" height="21" width="21">
        </a>
      </td><td style="padding: 0px 5px;" class="social-icon-column">
        <a role="social-icon-link" href="https://twitter.com/sendgrid" target="_blank" alt="Twitter" title="Twitter" style="display:inline-block; background-color:#9D9D9D; height:21px; width:21px;">
          <img role="social-icon" alt="Twitter" title="Twitter" src="https://mc.sendgrid.com/assets/social/white/twitter.png" style="height:21px; width:21px;" height="21" width="21">
        </a>
      </td></tr></tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
      </table></td>
          </tr>
        </tbody>
      </table></td>
        </tr>
      </tbody>
    </table></td>
                                        </tr>
                                      </table>
                                      <!--[if mso]>
                                    </td>
                                  </tr>
                                </table>
                              </center>
                              <![endif]-->
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </center>
      </body>
    </html>`;
}
