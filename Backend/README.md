Ada 2 endpoint yang bisa dipakai untuk mengakses backend, yaitu [Directory]/Backend/ (secara internal), dan (http://kerupuksambel.com:6900/)[http://kerupuksambel.com:6900/] (secara eksternal). 

Untuk menggunakan endpoint internal, gunakan file `.htaccess` di folder ini. Aktifkan __mod_rewrite__ terlebih dahulu.  

# Endpoint
- `GET /` untuk mendapatkan JSON dari seluruh item
- `GET /object/{nama}` untuk mendapat data dari item tertentu.
 	- **Nama** dapat diisi sebagai berikut :
 		- merkurius
		- venus
		- bumi
		- bulan
		- mars
		- jupiter
		- saturnus
		- uranus
		- neptunus
		- pluto
