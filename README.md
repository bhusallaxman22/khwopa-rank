# Info
This is a simple web-scrapper built using nodejs and puppeteer. The scrapper scrapes data from (https://khwopa.edu.np/apply/verified_applicants.html) compares it against [IOE's Pass List](https://entrance.ioe.edu.np/notice/download?filename=BEBARCH_Entrance_Result_2077.pdf&contentType=pdf). I built this because a friend of mine requested me to do so. This is built entirely for educational purpose.

# How to use it
1. Make sure nodejs and npm are installed. 
2. Run `npm install`.
3. Run `node main`

# What can it do
- Gets verified applicant name list and stores them in an array.
- Compare the provided IOE's entrance roll no. against IOE's pass list and return rank.
- Sort the rank and store it in a text file.