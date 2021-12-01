export const CONFIG_WITH_TRANSLATIONS = `
[global]
geonetwork4_api_url = "/geonetwork/srv/api"
proxy_path = "/proxy/?url="

[theme]
primary_color = "#093564"
secondary_color = "#c2e9dc"
main_color = "#212029" # All-purpose text color
background_color = "#fdfbff"
main_font = 'sans-serif'
title_font = 'serif'
fonts_stylesheet_url = "https://fonts.googleapis.com/css2?family=Open+Sans"

[translations.en]
"my.first.key" = 'First label.'
"my.second.key" = """
Second label,
on two lines."""

[translations.de]
my.first.key = 'Erste Etikett.'

[translations.fr]
my.sample.text = "Un bon exemple de texte."
"my.quoted.text" = 'du texte entre guillements.'
`
