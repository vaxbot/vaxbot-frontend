import React from "react";
import "./About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function About() {
  let bmc_link = (<a className="bmc-link" target="_blank" rel="noopener noreferrer" href="https://www.buymeacoffee.com/vaxbot">
          <span>
            <img src="/images/BMC-logo-wordmark-black.svg" id="bmc-logo" alt="buy me a coffee" />
          </span>
        </a>)
        
  let github_link = (
    <a className="github" target="_blank" rel="noopener noreferrer" href="https://github.com/vaxbot">
              <FontAwesomeIcon id="github-icon" icon={["fab", "github"]}/>
              <span>Github</span>
            </a>)
        
  return (
    <div id="about">
      <h3>So, What is vaxbot?</h3>

      <p>Vaxbot is designed to help people save time searching for COVID-19 vaccines. Instead of having to check multiple sites and fill out eligibility forms
      on each, vaxbot can confirm vaccine availability BEFORE you go through all that.</p> 

      <h3>Who built this and why?</h3>

      <p>Vaxbot was built by Austin Carnahan. The original idea was inspired by Huge Ma, the creator of the NYC-based <a href="https://www.turbovax.info/" target="_blank" rel="noopener noreferrer" >TurboVax</a> We've borrowed a lot of ideas
      and design from them, huge thanks! We've also learned a lot from Nick Muerdter's <a href="https://www.vaccinespotter.org/" target="_blank" rel="noopener noreferrer" >Vaccine Spotter</a> and their code has helped us vastly improve our pharmacy searches.</p>


      <p>Recently, Missouri has consistly ranked last in measures of percent of population vaccinated. We wanted to bring some of the most forward-thinking tools
      to our community and help facilitate the proccess of getting more people vaccinated.</p>

      <h3>What makes vabot unique?</h3>

      <p>While there are new tools being published every day, we think vaxbot is special in that it automates collection of data at a national level AND has a strong focus on
      regional community engagement. We find dedicated volunteers to run regional social media channels which are informed by our national scans and who help us include 
      more local resources.</p>

      <h3>When I follow your links, I'm still not seeing available vaccine appointments</h3>

      <p>We try to update our data as frequently as possible without disrupting the services that provide our information. 
      Vaccine appointments fill up very fast. Refresh the site and check back often for the best chance at securing an appointment.</p>


      <h3>Am I eligible for a vaccine?</h3>

      <p>We don't keep track of state or federal eligibility requirements. Make sure you qualify for vaccines in your area.</p> 

      <h3>How can I contribute?</h3>

      <p>You can help keep us going by donating at {bmc_link}</p>
 
      <p>If you'd like to collaborate or contribute otherwise, please check our {github_link} repositories or email us at vaxbotstl@gmail.com</p>
    </div>
  )
}

export default About;
