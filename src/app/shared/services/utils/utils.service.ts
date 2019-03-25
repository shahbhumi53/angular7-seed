import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  public static OcpApimSubscriptionKey = '35388bce705e4afab43c31663812a327';
  public static COUNTRIES = [
    {name: 'Afghanistan', URLSubStr : '', code: 'AF', customconfig: '', countryCodeForGRes: 'AF', isVatCountry: false},
    {name: 'Åland Islands', URLSubStr : '', code: 'AX', customconfig: '', countryCodeForGRes: 'AX', isVatCountry: false},
    {name: 'Albania', URLSubStr : '', code: 'AL', customconfig: '', countryCodeForGRes: 'AL', isVatCountry: false},
    {name: 'Algeria', URLSubStr : '', code: 'DZ', customconfig: '', countryCodeForGRes: 'DZ' , isVatCountry: false},
    {name: 'American Samoa', URLSubStr : '', code: 'AS', customconfig: '', countryCodeForGRes: 'AS', isVatCountry: false},
    {name: 'AndorrA', URLSubStr : '', code: 'AD', customconfig: '', countryCodeForGRes: 'AD', isVatCountry: false},
    {name: 'Angola', URLSubStr : '', code: 'AO', customconfig: '', countryCodeForGRes: 'AO', isVatCountry: false},
    {name: 'Anguilla', URLSubStr : '', code: 'AI', customconfig: '', countryCodeForGRes: 'AI', isVatCountry: false},
    {name: 'Antarctica', URLSubStr : '', code: 'AQ', customconfig: '', countryCodeForGRes: 'AQ', isVatCountry: false},
    {name: 'Antigua and Barbuda', URLSubStr : '', code: 'AG', customconfig: '', countryCodeForGRes: 'AG', isVatCountry: false},
    {name: 'Argentina', URLSubStr : '', code: 'AR', customconfig: '', countryCodeForGRes: 'AR', isVatCountry: false},
    {name: 'Armenia', URLSubStr : '', code: 'AM', customconfig: '', countryCodeForGRes: 'AM', isVatCountry: false},
    {name: 'Aruba', URLSubStr : '', code: 'AW', customconfig: '', countryCodeForGRes: 'AW', isVatCountry: false},
    {name: 'Australia', URLSubStr: 'au', code: 'en-AU', customconfig: '3682627834', countryCodeForGRes: 'AU', isVatCountry: false},
    {name: 'Austria', URLSubStr : '', code: 'AT', customconfig: '', countryCodeForGRes: 'AT', isVatCountry: true},
    {name: 'Azerbaijan', URLSubStr : '', code: 'AZ', customconfig: '', countryCodeForGRes: 'AZ', isVatCountry: false},
    {name: 'Bahamas', URLSubStr : '', code: 'BS', customconfig: '', countryCodeForGRes: 'BS', isVatCountry: false},
    {name: 'Bahrain', URLSubStr : '', code: 'BH', customconfig: '', countryCodeForGRes: 'BH', isVatCountry: false},
    {name: 'Bangladesh', URLSubStr : '', code: 'BD', customconfig: '', countryCodeForGRes: 'BD', isVatCountry: false},
    {name: 'Barbados', URLSubStr : '', code: 'BB', customconfig: '', countryCodeForGRes: 'BB', isVatCountry: false},
    {name: 'Belarus', URLSubStr : '', code: 'BY', customconfig: '', countryCodeForGRes: 'BY', isVatCountry: false},
    {name: 'Belgium', URLSubStr : '', code: 'BE', customconfig: '', countryCodeForGRes: 'BE', isVatCountry: true},
    {name: 'Belize', URLSubStr : '', code: 'BZ', customconfig: '', countryCodeForGRes: 'BZ', isVatCountry: false},
    {name: 'Benin', URLSubStr : '', code: 'BJ', customconfig: '', countryCodeForGRes: 'BJ', isVatCountry: false},
    {name: 'Bermuda', URLSubStr : '', code: 'BM', customconfig: '', countryCodeForGRes: 'BM', isVatCountry: false},
    {name: 'Bhutan', URLSubStr : '', code: 'BT', customconfig: '', countryCodeForGRes: 'BT', isVatCountry: false},
    {name: 'Bolivia', URLSubStr : '', code: 'BO', customconfig: '', countryCodeForGRes: 'BO', isVatCountry: false},
    {name: 'Bosnia and Herzegovina', URLSubStr : '', code: 'BA', customconfig: '', countryCodeForGRes: 'BA', isVatCountry: false},
    {name: 'Botswana', URLSubStr : '', code: 'BW', customconfig: '', countryCodeForGRes: 'BW', isVatCountry: false},
    {name: 'Bouvet Island', URLSubStr : '', code: 'BV', customconfig: '', countryCodeForGRes: 'BV', isVatCountry: false},
    {name: 'Brazil', URLSubStr: 'br', code: 'pt-BR', customconfig: '600971041', countryCodeForGRes: 'BR', isVatCountry: false},
    {name: 'British Indian Ocean Territory', URLSubStr : '', code: 'IO', customconfig: '', countryCodeForGRes: 'IO', isVatCountry: false},
    {name: 'Brunei Darussalam', URLSubStr : '', code: 'BN', customconfig: '', countryCodeForGRes: 'BN', isVatCountry: false},
    {name: 'Bulgaria', URLSubStr : '', code: 'BG', customconfig: '', countryCodeForGRes: 'BG', isVatCountry: true},
    {name: 'Burkina Faso', URLSubStr : '', code: 'BF', customconfig: '', countryCodeForGRes: 'BF', isVatCountry: false},
    {name: 'Burundi', URLSubStr : '', code: 'BI', customconfig: '', countryCodeForGRes: 'BI', isVatCountry: false},
    {name: 'Cambodia', URLSubStr : '', code: 'KH', customconfig: '', countryCodeForGRes: 'KH', isVatCountry: false},
    {name: 'Cameroon', URLSubStr : '', code: 'CM', customconfig: '', countryCodeForGRes: 'CM', isVatCountry: false},
    {name: 'Canada', URLSubStr: 'ca', code: 'en-CA', customconfig: '474220064', countryCodeForGRes: 'CA', isVatCountry: false},
    {name: 'Cape Verde', URLSubStr : '', code: 'CV', customconfig: '', countryCodeForGRes: 'CV', isVatCountry: false},
    {name: 'Cayman Islands', URLSubStr : '', code: 'KY', customconfig: '', countryCodeForGRes: 'KY', isVatCountry: false},
    {name: 'Central African Republic', URLSubStr : '', code: 'CF', customconfig: '', countryCodeForGRes: 'CF', isVatCountry: false},
    {name: 'Chad', URLSubStr : '', code: 'TD', customconfig: '', countryCodeForGRes: 'TD', isVatCountry: false},
    {name: 'Chile', URLSubStr : '', code: 'CL', customconfig: '', countryCodeForGRes: 'CL', isVatCountry: false},
    {name: 'China', URLSubStr : '', code: 'CN', customconfig: '', countryCodeForGRes: 'CN', isVatCountry: false},
    {name: 'Christmas Island', URLSubStr : '', code: 'CX', customconfig: '', countryCodeForGRes: 'CX', isVatCountry: false},
    {name: 'Cocos (Keeling) Islands', URLSubStr : '', code: 'CC', customconfig: '', countryCodeForGRes: 'CC', isVatCountry: false},
    {name: 'Colombia', URLSubStr : '', code: 'CO', customconfig: '', countryCodeForGRes: 'CO', isVatCountry: false},
    {name: 'Comoros', URLSubStr : '', code: 'KM', customconfig: '', countryCodeForGRes: 'KM', isVatCountry: false},
    {name: 'Congo', URLSubStr : '', code: 'CG', customconfig: '', countryCodeForGRes: 'CG', isVatCountry: false},
    {name: 'Congo, The Democratic Republic of the', URLSubStr : '', code: 'CD', customconfig: '', countryCodeForGRes: 'CD', isVatCountry: false},
    {name: 'Cook Islands', URLSubStr : '', code: 'CK', customconfig: '', countryCodeForGRes: 'CK', isVatCountry: false},
    {name: 'Costa Rica', URLSubStr : '', code: 'CR', customconfig: '', countryCodeForGRes: 'CR', isVatCountry: false},
    {name: 'Cote D\'Ivoire', URLSubStr : '', code: 'CI', customconfig: '', countryCodeForGRes: 'CI', isVatCountry: false},
    {name: 'Croatia', URLSubStr : '', code: 'HR', customconfig: '', countryCodeForGRes: 'HR', isVatCountry: true},
    {name: 'Cuba', URLSubStr : '', code: 'CU', customconfig: '', countryCodeForGRes: 'CU', isVatCountry: false},
    {name: 'Cyprus', URLSubStr : '', code: 'CY', customconfig: '', countryCodeForGRes: 'CY', isVatCountry: true},
    {name: 'Czech Republic', URLSubStr : '', code: 'CZ', customconfig: '', countryCodeForGRes: 'CZ', isVatCountry: true},
    {name: 'Denmark', URLSubStr : '', code: 'DK', customconfig: '', countryCodeForGRes: 'DK', isVatCountry: true},
    {name: 'Djibouti', URLSubStr : '', code: 'DJ', customconfig: '', countryCodeForGRes: 'DJ', isVatCountry: false},
    {name: 'Dominica', URLSubStr : '', code: 'DM', customconfig: '', countryCodeForGRes: 'DM', isVatCountry: false},
    {name: 'Dominican Republic', URLSubStr : '', code: 'DO', customconfig: '', countryCodeForGRes: 'DO', isVatCountry: false},
    {name: 'Ecuador', URLSubStr : '', code: 'EC', customconfig: '', countryCodeForGRes: 'EC', isVatCountry: false},
    {name: 'Egypt', URLSubStr : '', code: 'EG', customconfig: '', countryCodeForGRes: 'EG', isVatCountry: false},
    {name: 'El Salvador', URLSubStr : '', code: 'SV', customconfig: '', countryCodeForGRes: 'SV', isVatCountry: false},
    {name: 'Equatorial Guinea', URLSubStr : '', code: 'GQ', customconfig: '', countryCodeForGRes: 'GQ', isVatCountry: false},
    {name: 'Eritrea', URLSubStr : '', code: 'ER', customconfig: '', countryCodeForGRes: 'ER', isVatCountry: false},
    {name: 'Estonia', URLSubStr : '', code: 'EE', customconfig: '', countryCodeForGRes: 'EE', isVatCountry: true},
    {name: 'Ethiopia', URLSubStr : '', code: 'ET', customconfig: '', countryCodeForGRes: 'ET', isVatCountry: false},
    {name: 'Falkland Islands (Malvinas)', URLSubStr : '', code: 'FK', customconfig: '', countryCodeForGRes: 'FK', isVatCountry: false},
    {name: 'Faroe Islands', URLSubStr : '', code: 'FO', customconfig: '', countryCodeForGRes: 'FO', isVatCountry: false},
    {name: 'Fiji', URLSubStr : '', code: 'FJ', customconfig: '', countryCodeForGRes: 'FJ', isVatCountry: false},
    {name: 'Finland', URLSubStr : '', code: 'FI', customconfig: '', countryCodeForGRes: 'FI', isVatCountry: true},
    {name: 'France', URLSubStr: 'fr', code: 'fr-FR', customconfig: '2217080592', countryCodeForGRes: 'FR', isVatCountry: false},
    {name: 'French Guiana', URLSubStr : '', code: 'GF', customconfig: '', countryCodeForGRes: 'GF', isVatCountry: false},
    {name: 'French Polynesia', URLSubStr : '', code: 'PF', customconfig: '', countryCodeForGRes: 'PF', isVatCountry: false},
    {name: 'French Southern Territories', URLSubStr : '', code: 'TF', customconfig: '', countryCodeForGRes: 'TF', isVatCountry: false},
    {name: 'Gabon', URLSubStr : '', code: 'GA', customconfig: '', countryCodeForGRes: 'GA', isVatCountry: false},
    {name: 'Gambia', URLSubStr : '', code: 'GM', customconfig: '', countryCodeForGRes: 'GM', isVatCountry: false},
    {name: 'Georgia', URLSubStr : '', code: 'GE', customconfig: '', countryCodeForGRes: 'GE', isVatCountry: false},
    {name: 'Germany', URLSubStr: 'de', code: 'de-DE', customconfig: '4020894489', countryCodeForGRes: 'DE', isVatCountry: true},
    {name: 'Ghana', URLSubStr : '', code: 'GH', customconfig: '', countryCodeForGRes: 'GH', isVatCountry: false},
    {name: 'Gibraltar', URLSubStr : '', code: 'GI', customconfig: '', countryCodeForGRes: 'GI', isVatCountry: false},
    {name: 'Greece', URLSubStr : '', code: 'GR', customconfig: '', countryCodeForGRes: 'GR', isVatCountry: true},
    {name: 'Greenland', URLSubStr : '', code: 'GL', customconfig: '', countryCodeForGRes: 'GL', isVatCountry: false},
    {name: 'Grenada', URLSubStr : '', code: 'GD', customconfig: '', countryCodeForGRes: 'GD', isVatCountry: false},
    {name: 'Guadeloupe', URLSubStr : '', code: 'GP', customconfig: '', countryCodeForGRes: 'GP', isVatCountry: false},
    {name: 'Guam', URLSubStr : '', code: 'GU', customconfig: '', countryCodeForGRes: 'GU', isVatCountry: false},
    {name: 'Guatemala', URLSubStr : '', code: 'GT', customconfig: '', countryCodeForGRes: 'GT', isVatCountry: false},
    {name: 'Guernsey', URLSubStr : '', code: 'GG', customconfig: '', countryCodeForGRes: 'GG', isVatCountry: false},
    {name: 'Guinea', URLSubStr : '', code: 'GN', customconfig: '', countryCodeForGRes: 'GN', isVatCountry: false},
    {name: 'Guinea-Bissau', URLSubStr : '', code: 'GW', customconfig: '', countryCodeForGRes: 'GW', isVatCountry: false},
    {name: 'Guyana', URLSubStr : '', code: 'GY', customconfig: '', countryCodeForGRes: 'GY', isVatCountry: false},
    {name: 'Haiti', URLSubStr : '', code: 'HT', customconfig: '', countryCodeForGRes: 'HT', isVatCountry: false},
    {name: 'Heard Island and Mcdonald Islands', URLSubStr : '', code: 'HM', customconfig: '', countryCodeForGRes: 'HM', isVatCountry: false},
    {name: 'Holy See (Vatican City State)', URLSubStr : '', code: 'VA', customconfig: '', countryCodeForGRes: 'VA', isVatCountry: false},
    {name: 'Honduras', URLSubStr : '', code: 'HN', customconfig: '', countryCodeForGRes: 'HN', isVatCountry: false},
    {name: 'Hong Kong', URLSubStr : '', code: 'HK', customconfig: '', countryCodeForGRes: 'HK', isVatCountry: false},
    {name: 'Hungary', URLSubStr : '', code: 'HU', customconfig: '', countryCodeForGRes: 'HU', isVatCountry: true},
    {name: 'Iceland', URLSubStr : '', code: 'IS', customconfig: '', countryCodeForGRes: 'IS', isVatCountry: false},
    {name: 'India', URLSubStr : '', code: 'IN', customconfig: '', countryCodeForGRes: 'IN', isVatCountry: false},
    {name: 'Indonesia', URLSubStr : '', code: 'ID', customconfig: '', countryCodeForGRes: 'ID', isVatCountry: false},
    {name: 'Iran, Islamic Republic Of', URLSubStr : '', code: 'IR', customconfig: '', countryCodeForGRes: 'IR', isVatCountry: false},
    {name: 'Iraq', URLSubStr : '', code: 'IQ', customconfig: '', countryCodeForGRes: 'IQ', isVatCountry: false},
    {name: 'Ireland', URLSubStr: 'ie', code: 'en-IE', customconfig: '1909229051', countryCodeForGRes: 'IE', isVatCountry: true},
    {name: 'Isle of Man', URLSubStr : '', code: 'IM', customconfig: '', countryCodeForGRes: 'IM', isVatCountry: false},
    {name: 'Israel', URLSubStr : '', code: 'IL', customconfig: '', countryCodeForGRes: 'IL', isVatCountry: false},
    {name: 'Italy', URLSubStr: 'it', code: 'it-IT', customconfig: '946754085', countryCodeForGRes: 'IT', isVatCountry: true},
    {name: 'Jamaica', URLSubStr : '', code: 'JM', customconfig: '', countryCodeForGRes: 'JM', isVatCountry: false},
    {name: 'Japan', URLSubStr : '', code: 'JP', customconfig: '', countryCodeForGRes: 'JP', isVatCountry: false},
    {name: 'Jersey', URLSubStr : '', code: 'JE', customconfig: '', countryCodeForGRes: 'JE', isVatCountry: false},
    {name: 'Jordan', URLSubStr : '', code: 'JO', customconfig: '', countryCodeForGRes: 'JO', isVatCountry: false},
    {name: 'Kazakhstan', URLSubStr : '', code: 'KZ', customconfig: '', countryCodeForGRes: 'KZ', isVatCountry: false},
    {name: 'Kenya', URLSubStr : '', code: 'KE', customconfig: '', countryCodeForGRes: 'KE', isVatCountry: false},
    {name: 'Kiribati', URLSubStr : '', code: 'KI', customconfig: '', countryCodeForGRes: 'KI', isVatCountry: false},
    {name: 'Korea, Democratic People\'S Republic of', URLSubStr : '', code: 'KP', customconfig: '', countryCodeForGRes: 'KP', isVatCountry: false},
    {name: 'Korea, Republic of', URLSubStr : '', code: 'KR', customconfig: '', countryCodeForGRes: 'KR', isVatCountry: false},
    {name: 'Kuwait', URLSubStr : '', code: 'KW', customconfig: '', countryCodeForGRes: 'KW', isVatCountry: false},
    {name: 'Kyrgyzstan', URLSubStr : '', code: 'KG', customconfig: '', countryCodeForGRes: 'KG', isVatCountry: false},
    {name: 'Lao People\'S Democratic Republic', URLSubStr : '', code: 'LA', customconfig: '', countryCodeForGRes: 'LA', isVatCountry: false},
    {name: 'Latvia', URLSubStr : '', code: 'LV', customconfig: '', countryCodeForGRes: 'LV', isVatCountry: true},
    {name: 'Lebanon', URLSubStr : '', code: 'LB', customconfig: '', countryCodeForGRes: 'LB', isVatCountry: false},
    {name: 'Lesotho', URLSubStr : '', code: 'LS', customconfig: '', countryCodeForGRes: 'LS', isVatCountry: false},
    {name: 'Liberia', URLSubStr : '', code: 'LR', customconfig: '', countryCodeForGRes: 'LR', isVatCountry: false},
    {name: 'Libyan Arab Jamahiriya', URLSubStr : '', code: 'LY', customconfig: '', countryCodeForGRes: 'LY', isVatCountry: false},
    {name: 'Liechtenstein', URLSubStr : '', code: 'LI', customconfig: '', countryCodeForGRes: 'LI', isVatCountry: false},
    {name: 'Lithuania', URLSubStr : '', code: 'LT', customconfig: '', countryCodeForGRes: 'LT', isVatCountry: true},
    {name: 'Luxembourg', URLSubStr : '', code: 'LU', customconfig: '', countryCodeForGRes: 'LU', isVatCountry: true},
    {name: 'Macao', URLSubStr : '', code: 'MO', customconfig: '', countryCodeForGRes: 'MO', isVatCountry: false},
    {name: 'Macedonia, The Former Yugoslav Republic of', URLSubStr : '', code: 'MK', customconfig: '', countryCodeForGRes: 'MK', isVatCountry: false},
    {name: 'Madagascar', URLSubStr : '', code: 'MG', customconfig: '', countryCodeForGRes: 'MG', isVatCountry: false},
    {name: 'Malawi', URLSubStr : '', code: 'MW', customconfig: '', countryCodeForGRes: 'MW', isVatCountry: false},
    {name: 'Malaysia', URLSubStr : '', code: 'MY', customconfig: '', countryCodeForGRes: 'MY', isVatCountry: false},
    {name: 'Maldives', URLSubStr : '', code: 'MV', customconfig: '', countryCodeForGRes: 'MV', isVatCountry: false},
    {name: 'Mali', URLSubStr : '', code: 'ML', customconfig: '', countryCodeForGRes: 'ML', isVatCountry: false},
    {name: 'Malta', URLSubStr : '', code: 'MT', customconfig: '', countryCodeForGRes: 'MT', isVatCountry: true},
    {name: 'Marshall Islands', URLSubStr : '', code: 'MH', customconfig: '', countryCodeForGRes: 'MH', isVatCountry: false},
    {name: 'Martinique', URLSubStr : '', code: 'MQ', customconfig: '', countryCodeForGRes: 'MQ', isVatCountry: false},
    {name: 'Mauritania', URLSubStr : '', code: 'MR', customconfig: '', countryCodeForGRes: 'MR', isVatCountry: false},
    {name: 'Mauritius', URLSubStr : '', code: 'MU', customconfig: '', countryCodeForGRes: 'MU', isVatCountry: false},
    {name: 'Mayotte', URLSubStr : '', code: 'YT', customconfig: '', countryCodeForGRes: 'YT', isVatCountry: false},
    {name: 'Mexico', URLSubStr: 'mx', code: 'es-MX', customconfig: '2964454851', countryCodeForGRes: 'MX', isVatCountry: false},
    {name: 'Micronesia, Federated States of', URLSubStr : '', code: 'FM', customconfig: '', countryCodeForGRes: 'FM', isVatCountry: false},
    {name: 'Moldova, Republic of', URLSubStr : '', code: 'MD', customconfig: '', countryCodeForGRes: 'MD', isVatCountry: false},
    {name: 'Monaco', URLSubStr : '', code: 'MC', customconfig: '', countryCodeForGRes: 'MN', isVatCountry: false},
    {name: 'Mongolia', URLSubStr : '', code: 'MN', customconfig: '', countryCodeForGRes: '', isVatCountry: false},
    {name: 'Montserrat', URLSubStr : '', code: 'MS', customconfig: '', countryCodeForGRes: 'MS', isVatCountry: false},
    {name: 'Morocco', URLSubStr : '', code: 'MA', customconfig: '', countryCodeForGRes: 'MA', isVatCountry: false},
    {name: 'Mozambique', URLSubStr : '', code: 'MZ', customconfig: '', countryCodeForGRes: 'MZ', isVatCountry: false},
    {name: 'Myanmar', URLSubStr : '', code: 'MM', customconfig: '', countryCodeForGRes: 'MM', isVatCountry: false},
    {name: 'Namibia', URLSubStr : '', code: 'NA', customconfig: '', countryCodeForGRes: 'NA', isVatCountry: false},
    {name: 'Nauru', URLSubStr : '', code: 'NR', customconfig: '', countryCodeForGRes: 'NR', isVatCountry: false},
    {name: 'Nepal', URLSubStr : '', code: 'NP', customconfig: '', countryCodeForGRes: 'NP', isVatCountry: false},
    {name: 'Netherlands', URLSubStr: 'nl', code: 'nl-NL', customconfig: '1559724798', countryCodeForGRes: 'NL', isVatCountry: true},
    {name: 'Netherlands Antilles', URLSubStr : '', code: 'AN', customconfig: '', countryCodeForGRes: 'AN', isVatCountry: false},
    {name: 'New Caledonia', URLSubStr : '', code: 'NC', customconfig: '', countryCodeForGRes: 'NC', isVatCountry: false},
    {name: 'New Zealand', URLSubStr : '', code: 'NZ', customconfig: '', countryCodeForGRes: 'NZ', isVatCountry: false},
    {name: 'Nicaragua', URLSubStr : '', code: 'NI', customconfig: '', countryCodeForGRes: 'NI', isVatCountry: false},
    {name: 'Niger', URLSubStr : '', code: 'NE', customconfig: '', countryCodeForGRes: 'NE', isVatCountry: false},
    {name: 'Nigeria', URLSubStr : '', code: 'NG', customconfig: '', countryCodeForGRes: 'NG', isVatCountry: false},
    {name: 'Niue', URLSubStr : '', code: 'NU', customconfig: '', countryCodeForGRes: 'NU', isVatCountry: false},
    {name: 'Norfolk Island', URLSubStr : '', code: 'NF', customconfig: '', countryCodeForGRes: 'NF', isVatCountry: false},
    {name: 'Northern Mariana Islands', URLSubStr : '', code: 'MP', customconfig: '', countryCodeForGRes: 'MP', isVatCountry: false},
    {name: 'Norway', URLSubStr : '', code: 'NO', customconfig: '', countryCodeForGRes: 'NO' , isVatCountry: false},
    {name: 'Oman', URLSubStr : '', code: 'OM', customconfig: '', countryCodeForGRes: 'OM', isVatCountry: false},
    {name: 'Pakistan', URLSubStr : '', code: 'PK', customconfig: '', countryCodeForGRes: 'PK', isVatCountry: false},
    {name: 'Palau', URLSubStr : '', code: 'PW', customconfig: '', countryCodeForGRes: 'PW', isVatCountry: false},
    {name: 'Palestinian Territory, Occupied', URLSubStr : '', code: 'PS', customconfig: '', countryCodeForGRes: 'PS', isVatCountry: false},
    {name: 'Panama', URLSubStr : '', code: 'PA', customconfig: '', countryCodeForGRes: 'PA', isVatCountry: false},
    {name: 'Papua New Guinea', URLSubStr : '', code: 'PG', customconfig: '', countryCodeForGRes: 'PG', isVatCountry: false},
    {name: 'Paraguay', URLSubStr : '', code: 'PY', customconfig: '', countryCodeForGRes: 'PY', isVatCountry: false},
    {name: 'Peru', URLSubStr : '', code: 'PE', customconfig: '', countryCodeForGRes: 'PE', isVatCountry: false},
    {name: 'Philippines', URLSubStr : '', code: 'PH', customconfig: '', countryCodeForGRes: 'PH', isVatCountry: false},
    {name: 'Pitcairn', URLSubStr : '', code: 'PN', customconfig: '', countryCodeForGRes: 'PN', isVatCountry: false},
    {name: 'Poland', URLSubStr : '', code: 'PL', customconfig: '', countryCodeForGRes: 'PL', isVatCountry: true},
    {name: 'Portugal', URLSubStr : '', code: 'PT', customconfig: '', countryCodeForGRes: 'PT', isVatCountry: true},
    {name: 'Puerto Rico', URLSubStr : '', code: 'PR', customconfig: '', countryCodeForGRes: 'PR', isVatCountry: false},
    {name: 'Qatar', URLSubStr : '', code: 'QA', customconfig: '', countryCodeForGRes: 'QA', isVatCountry: false},
    {name: 'Reunion', URLSubStr : '', code: 'RE', customconfig: '', countryCodeForGRes: 'RE', isVatCountry: false},
    {name: 'Romania', URLSubStr : '', code: 'RO', customconfig: '', countryCodeForGRes: 'RO', isVatCountry: true},
    {name: 'Russian Federation', URLSubStr : '', code: 'RU', customconfig: '', countryCodeForGRes: 'RU', isVatCountry: false},
    {name: 'RWANDA', URLSubStr : '', code: 'RW', customconfig: '', countryCodeForGRes: 'RW', isVatCountry: false},
    {name: 'Saint Helena', URLSubStr : '', code: 'SH', customconfig: '', countryCodeForGRes: 'SH', isVatCountry: false},
    {name: 'Saint Kitts and Nevis', URLSubStr : '', code: 'KN', customconfig: '', countryCodeForGRes: 'KN', isVatCountry: false},
    {name: 'Saint Lucia', URLSubStr : '', code: 'LC', customconfig: '', countryCodeForGRes: 'LC', isVatCountry: false},
    {name: 'Saint Pierre and Miquelon', URLSubStr : '', code: 'PM', customconfig: '', countryCodeForGRes: 'PM', isVatCountry: false},
    {name: 'Saint Vincent and the Grenadines', URLSubStr : '', code: 'VC', customconfig: '', countryCodeForGRes: 'VC', isVatCountry: false},
    {name: 'Samoa', URLSubStr : '', code: 'WS', customconfig: '', countryCodeForGRes: 'WS', isVatCountry: false},
    {name: 'San Marino', URLSubStr : '', code: 'SM', customconfig: '', countryCodeForGRes: 'SM', isVatCountry: false},
    {name: 'Sao Tome and Principe', URLSubStr : '', code: 'ST', customconfig: '', countryCodeForGRes: 'ST', isVatCountry: false},
    {name: 'Saudi Arabia', URLSubStr : '', code: 'SA', customconfig: '', countryCodeForGRes: 'SA', isVatCountry: false},
    {name: 'Senegal', URLSubStr : '', code: 'SN', customconfig: '', countryCodeForGRes: 'SN', isVatCountry: false},
    {name: 'Serbia and Montenegro', URLSubStr : '', code: 'CS', customconfig: '', countryCodeForGRes: 'CS', isVatCountry: false},
    {name: 'Seychelles', URLSubStr : '', code: 'SC', customconfig: '', countryCodeForGRes: 'SC', isVatCountry: false},
    {name: 'Sierra Leone', URLSubStr : '', code: 'SL', customconfig: '', countryCodeForGRes: 'SL', isVatCountry: false},
    {name: 'Singapore', URLSubStr: 'sg', code: 'en-SG', customconfig: '3977205965', countryCodeForGRes: 'SG', isVatCountry: false},
    {name: 'Slovakia', URLSubStr : '', code: 'SK', customconfig: '', countryCodeForGRes: 'SK', isVatCountry: true},
    {name: 'Slovenia', URLSubStr : '', code: 'SI', customconfig: '', countryCodeForGRes: 'SI', isVatCountry: false},
    {name: 'Solomon Islands', URLSubStr : '', code: 'SB', customconfig: '', countryCodeForGRes: 'SB', isVatCountry: true},
    {name: 'Somalia', URLSubStr : '', code: 'SO', customconfig: '', countryCodeForGRes: 'SO', isVatCountry: false},
    {name: 'South Africa', URLSubStr : '', code: 'ZA', customconfig: '', countryCodeForGRes: 'ZA', isVatCountry: false},
    {name: 'South Georgia and the South Sandwich Islands', URLSubStr : '', code: 'GS', customconfig: '', countryCodeForGRes: 'GS', isVatCountry: false},
    {name: 'Spain', URLSubStr: 'es', code: 'es-ES', customconfig: '3822946566', countryCodeForGRes: 'ES', isVatCountry: true},
    {name: 'Sri Lanka', URLSubStr : '', code: 'LK', customconfig: '', countryCodeForGRes: 'LK', isVatCountry: false},
    {name: 'Sudan', URLSubStr : '', code: 'SD', customconfig: '', countryCodeForGRes: 'SD', isVatCountry: false},
    {name: 'Suriname', URLSubStr : '', code: 'SR', customconfig: '', countryCodeForGRes: 'SR', isVatCountry: false},
    {name: 'Svalbard and Jan Mayen', URLSubStr : '', code: 'SJ', customconfig: '', countryCodeForGRes: 'SJ', isVatCountry: false},
    {name: 'Swaziland', URLSubStr : '', code: 'SZ', customconfig: '', countryCodeForGRes: 'SZ', isVatCountry: false},
    {name: 'Sweden', URLSubStr : '', code: 'SE', customconfig: '', countryCodeForGRes: 'SE', isVatCountry: true},
    {name: 'Switzerland', URLSubStr: 'ch', code: 'fr-CH', customconfig: '2423898007', countryCodeForGRes: 'CH', isVatCountry: false},
    {name: 'Syrian Arab Republic', URLSubStr : '', code: 'SY', customconfig: '', countryCodeForGRes: 'SY', isVatCountry: false},
    {name: 'Taiwan, Province of China', URLSubStr : '', code: 'TW', customconfig: '', countryCodeForGRes: 'TW', isVatCountry: false},
    {name: 'Tajikistan', URLSubStr : '', code: 'TJ', customconfig: '', countryCodeForGRes: 'TJ', isVatCountry: false},
    {name: 'Tanzania, United Republic of', URLSubStr : '', code: 'TZ', customconfig: '', countryCodeForGRes: 'TZ', isVatCountry: false},
    {name: 'Thailand', URLSubStr : '', code: 'TH', customconfig: '', countryCodeForGRes: 'TH', isVatCountry: false},
    {name: 'Timor-Leste', URLSubStr : '', code: 'TL', customconfig: '', countryCodeForGRes: 'TL', isVatCountry: false},
    {name: 'Togo', URLSubStr : '', code: 'TG', customconfig: '', countryCodeForGRes: 'TG', isVatCountry: false},
    {name: 'Tokelau', URLSubStr : '', code: 'TK', customconfig: '', countryCodeForGRes: 'TK', isVatCountry: false},
    {name: 'Tonga', URLSubStr : '', code: 'TO', customconfig: '', countryCodeForGRes: 'TO', isVatCountry: false},
    {name: 'Trinidad and Tobago', URLSubStr : '', code: 'TT', customconfig: '', countryCodeForGRes: 'TT', isVatCountry: false},
    {name: 'Tunisia', URLSubStr : '', code: 'TN', customconfig: '', countryCodeForGRes: 'TN', isVatCountry: false},
    {name: 'Turkey', URLSubStr : '', code: 'TR', customconfig: '', countryCodeForGRes: 'TR', isVatCountry: false},
    {name: 'Turkmenistan', URLSubStr : '', code: 'TM', customconfig: '', countryCodeForGRes: 'TM', isVatCountry: false},
    {name: 'Turks and Caicos Islands', URLSubStr : '', code: 'TC', customconfig: '', countryCodeForGRes: 'TC', isVatCountry: false},
    {name: 'Tuvalu', URLSubStr : '', code: 'TV', customconfig: '', countryCodeForGRes: 'TV', isVatCountry: false},
    {name: 'Uganda', URLSubStr : '', code: 'UG', customconfig: '', countryCodeForGRes: 'UG', isVatCountry: false},
    {name: 'Ukraine', URLSubStr : '', code: 'UA', customconfig: '', countryCodeForGRes: 'UA', isVatCountry: false},
    {name: 'United Arab Emirates', URLSubStr : '', code: 'AE', customconfig: '', countryCodeForGRes: 'AE', isVatCountry: false},
    {name: 'United Kingdom', URLSubStr: 'uk', code: 'en-GB', customconfig: '1306172379', countryCodeForGRes: 'GB', isVatCountry: true},
    {name: 'United States of America', URLSubStr: 'en-US', code: 'en-US', customconfig: '33137736', countryCodeForGRes: 'US', isVatCountry: false},
    {name: 'United States Minor Outlying Islands', URLSubStr : '', code: 'UM', customconfig: '', countryCodeForGRes: 'UM', isVatCountry: false},
    {name: 'Uruguay', URLSubStr : '', code: 'UY', customconfig: '', countryCodeForGRes: 'UY', isVatCountry: false},
    {name: 'Uzbekistan', URLSubStr : '', code: 'UZ', customconfig: '', countryCodeForGRes: 'UZ', isVatCountry: false},
    {name: 'Vanuatu', URLSubStr : '', code: 'VU', customconfig: '', countryCodeForGRes: 'VU', isVatCountry: false},
    {name: 'Venezuela', URLSubStr : '', code: 'VE', customconfig: '', countryCodeForGRes: 'VE', isVatCountry: false},
    {name: 'Viet Nam', URLSubStr : '', code: 'VN', customconfig: '', countryCodeForGRes: 'VN', isVatCountry: false},
    {name: 'Virgin Islands, British', URLSubStr : '', code: 'VG', customconfig: '', countryCodeForGRes: 'VG', isVatCountry: false},
    {name: 'Virgin Islands, U.S.', URLSubStr : '', code: 'VI', customconfig: '', countryCodeForGRes: 'VI', isVatCountry: false},
    {name: 'Wallis and Futuna', URLSubStr : '', code: 'WF', customconfig: '', countryCodeForGRes: 'WF', isVatCountry: false},
    {name: 'Western Sahara', URLSubStr : '', code: 'EH', customconfig: '', countryCodeForGRes: 'EH', isVatCountry: false},
    {name: 'Yemen', URLSubStr : '', code: 'YE', customconfig: '', countryCodeForGRes: 'YE', isVatCountry: false},
    {name: 'Zambia', URLSubStr : '', code: 'ZM', customconfig: '', countryCodeForGRes: 'ZM', isVatCountry: false},
    {name: 'Zimbabwe', URLSubStr : '', code: 'ZW', customconfig: '', countryCodeForGRes: 'ZW', isVatCountry: false}
  ];
  public static bingCustomSearchAPIUrl = 'https://api.cognitive.microsoft.com/bingcustomsearch/v7.0/search?';
  public static DefaultCountry = 'United States of America';
  public static contactsTableColumns = [
    { columnHeader: 'Photo', keyOfRow: 'profileImage', data: [] },
    { columnHeader: 'Name', keyOfRow: 'full_name', data: [] },
    { columnHeader: 'Company Name', keyOfRow: 'company_name', data: [] },
    { columnHeader: 'Position', keyOfRow: 'role', data: [] },
    { columnHeader: 'Urls', keyOfRow: 'urls', data: ['linkedin_url', 'twitter_url', 'facebook_url'] },
    { columnHeader: 'Email', keyOfRow: 'email_perso', data: [] },
    { columnHeader: 'Email Verified', keyOfRow: 'status_of_email', data: [] },
    { columnHeader: 'Secondary Email', keyOfRow: 'secondary_email', data: [] },
    { columnHeader: '  Phone  ', keyOfRow: 'phone', data: [] }
  ];

  // -- key used in local storage for default list id
  public static KEY_DEFAULTLISTID = 'defaultListId';

  // -- key used in local storage for user's list
  public static KEY_USERLISTS = 'userLists';

  // -- key used in local storage for current user's id
  public static KEY_USERID = 'user_id';

  // -- key used in local storage for current user's name
  public static KEY_USERNAME = 'name';

  // -- key used in local storage for bing search queries
  public static KEY_BINGSEARCHSTRING = 'newBingAPISearchQueries';

  // -- key used in local storage for bing search queries
  public static KEY_ACCESSTOKEN = 'access_token';

  // -- key used in local storage for bing search queries
  public static KEY_IDTOKEN = 'id_token';

  // -- key used in local storage for bing search queries
  public static KEY_EXPIRESAT = 'expires_at';

  // -- key used in local storage for cerebro API call counter
  public static KEY_CEREBROCALLCOUNTER = 'segmentio.da84695.stack';

  // -- key used in local storage for cerebro API call timestamp
  public static KEY_CEREBROCALLTIMESTAMP = 'segmentio.da52920.stacktime';

  // -- credit card type
  public static CreditCards = [
    {
      type: 'maestro',
      image: '/assets/img/cc_img/maestro.png'
    }, {
      type: 'forbrugsforeningen',
      image: '/assets/img/cc_img/forbrugsforeningen.png'
    }, {
      type: 'dankort',
      image: '/assets/img/cc_img/dankort.png'
    }, {
      type: 'visa',
      image: '/assets/img/cc_img/visa.png'
    }, {
      type: 'mastercard',
      image: '/assets/img/cc_img/mastercard.png'
    }, {
      type: 'amex',
      image: '/assets/img/cc_img/amex.png'
    }, {
      type: 'dinersclub',
      image: '/assets/img/cc_img/dinersclub.png'
    }, {
      type: 'discover',
      image: '/assets/img/cc_img/discover.png'
    }, {
      type: 'unionpay',
      image: '/assets/img/cc_img/unionpay.png'
    }, {
      type: 'jcb',
      image: '/assets/img/cc_img/jcb.png'
    }
  ];

  // -- settings page object
  public static AppSettings = {
    country: '',
    landlinePhone: true,
    emailTypes: {
      predicted: true,
      valid: true,
      extraValid: true,
      ultraValid: true
    },
    RGPD: false
  };
  // -- bese64 image URL
  public static BASE64IMGAPI = 'https://nrcl9babgb.execute-api.us-east-2.amazonaws.com/test2/avatar/thumbnail?initials=';

  constructor() {
  }

  public static getCountryDetail(country = UtilsService.DefaultCountry) {
    // -- compare country names with .toLowercase method to resolve names capital latter issue
    const foundCountry = UtilsService.COUNTRIES.find(c => c.name.toLowerCase() === country.toLowerCase());
    return foundCountry ? foundCountry : {code: '', customconfig: '', URLSubStr: '', name: '', countryCodeForGRes: '', isVatCountry: false};
  }

  public static generateQParam(fullname: string, role: string, company: string, tagString: string): string | boolean {
    const q = fullname.trim().toLowerCase() + ' ' + role.trim().toLowerCase() + ' ' + company.trim().toLowerCase() + ' ' + tagString.trim();
    return q.trim().length > 0 ? q.trim() : false;

  }

  public static determineCountry(language: string, linkedInURL: string): string {
    let country: string;
    let URLSubStr = '';
    switch (language) {
      case 'en':
        // this regex removes http:// or https:// from beginning of the URL
        // -- /^(https:\/\/|http:\/\/)/g
        linkedInURL = linkedInURL.replace(/^(https:\/\/|http:\/\/)/g, '');
        // extract first 3 character from the string
        const substring = linkedInURL.slice(0, 3);
        // if 3rd is dot(.) then get first two character and create language code
        URLSubStr = substring[2] === '.' ? substring[0] + substring[1] : '';
        break;
      default:
        URLSubStr = language;
    }
    const foundCountry = URLSubStr !== '' ? UtilsService.COUNTRIES.find(c => c.URLSubStr === URLSubStr) : null;
    country = foundCountry ? foundCountry.name : UtilsService.DefaultCountry;
    return country;
  }

  // -- find name `default` from array of list and store its id in local storage
  public static storeDefaultListId(lists: any): boolean {
    if (lists.length > 0) {
      const l = lists.find(l => (l.name.toLowerCase() === ('Default').toLowerCase() || l.name.toLowerCase() === ('Default list').toLowerCase()));
      localStorage.setItem(UtilsService.KEY_DEFAULTLISTID, l.id);
      return true;
    } else {
      return false;
    }
  }


  // -- lists are sorted based on ID and store in local storage
  public static storeSortedLists(lists: any): boolean {
    if (lists.length > 0) {
      const sortedLists = lists.sort(function(a, b) { return a.id - b.id; });
      sortedLists.forEach((list) => {
        if (list.name && list.name.toLowerCase() === 'default') {
          list.name = 'Default list';
        }
      });
      localStorage.setItem(UtilsService.KEY_USERLISTS, JSON.stringify(sortedLists));
      return true;
    } else {
      return false;
    }
  }

  // -- initial letter capital
  public static ucfirst(str: string): string {
    if (str === null || str === undefined || str.length <= 0) {
      return str;
    }
    // -- convert all characters in lower case then extract first character, set upper case then concate and return
    str = str.toLowerCase();
    const firstLetter = str.slice(0, 1);
    return firstLetter.toUpperCase() + str.substring(1);
  }

  // -- first letter of each word is capital
  public static titleCase(str) {
    if (str === null || str === undefined || str.length <= 0) {
      return str;
    }

    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }

  // -- convert string to array by splitting new line character
  public static stringToListLowerCase(str: string): any[] {
    str = str.trim().toLowerCase();
    return str.split('\n');
  }

  // -- if element's length is less then 0 then pop that particular element
  public static refine(array: any[]) {
    array.forEach((val, index) => {
      if (val.length <= 0) { array.splice(index, 1); }
    });
  }

  // -- array length is determined from number of elements in previous text area,
  // -- for ex. company, if company text area has 6 elements inside then this will return array with 6 elements
  public static fillArrayWithElements(str: string, length): any[] {
    const array = [];
    for (let x = 0; x <= length; x++) {
      array.push(str);
    }
    return array;
  }

  // -- store searched data to localStorage to use in subsequent pagination call
  public static storeBingSearchQueries(obj: any) {
    const str = JSON.stringify(obj);
    localStorage.setItem(UtilsService.KEY_BINGSEARCHSTRING, str);
  }

  // -- determine country from linkedin url
  public static determineCountryFromLinkedin(linkedInURL: string): string {
    let country: string;
    let URLSubStr = '';
    // this regex removes http:// or https:// from beginning of the URL
    // -- /^(https:\/\/|http:\/\/)/g
    linkedInURL = linkedInURL.replace(/^(https:\/\/|http:\/\/)/g, '');
    // -- extract first 3 character from the string
    const substring = linkedInURL.slice(0, 3);
    // -- if 3rd is dot(.) then get first two character and create language code
    URLSubStr = substring[2] === '.' ? substring[0] + substring[1] : '';
    const foundCountry = URLSubStr !== '' ? UtilsService.COUNTRIES.find(c => c.URLSubStr === URLSubStr) : null;
    // -- if country not found then send General as country
    country = foundCountry ? foundCountry.name : 'General';
    return country;
  }

  /*public static sendRGPDParam(): boolean {
    const cs = new CookieService(window.document);
    if (cs.get('settings')) {
      const settings = JSON.parse(cs.get('settings'));
      return settings.RGPD;
    } else if (UtilsService.AppSettings.RGPD) {
      return UtilsService.AppSettings.RGPD;
    } else {
      return false;
    }
  }*/

  public static getBase64ImgURL(name: string): string {
    name = name.trim();
    const nameParts = name.split(' ');
    return UtilsService.BASE64IMGAPI + (nameParts[0][0]).toUpperCase() + (nameParts[1][0]).toUpperCase();
  }
}
