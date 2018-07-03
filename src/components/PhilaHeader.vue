<template>
  <header class="global-nav pbm pbn-mu mbn-mu">
    <!-- Begin global header-->
    <h1 class="accessible">City of Philadelphia</h1>
    <!-- Utility Navigation -->
    <div class="row columns bg-ben-franklin-blue expanded utility-nav" data-swiftype-index="false">
      <div class="row">
        <div class="medium-24 columns float-right">
          <ul class="medium-horizontal menu show-for-medium float-right">
            <li><a href="https://beta.phila.gov/departments/mayor/">Office of the Mayor</a></li>
            <li><a href="https://beta.phila.gov/departments/">City government directory</a></li>
            <li>
              <div id="google_translate_element" class="no-js"><span class="show-for-sr">Google Translate</span></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--sticky/desktop nav -->
    <div class="row">
      <div class="small-24 columns">
        <div class="row primary-menu" data-sticky-container data-swiftype-index="false">
          <div class="columns sticky phn" data-margin-top="0" data-sticky data-sticky-on="medium">
            <div class="row sticky-header-width">
              <div class="small-16 medium-6 columns small-push-4 medium-push-0">
                <a href="https://beta.phila.gov" class="logo" tabindex="1" aria-label="City of Philadelphia">
                  <img src="https://standards.phila.gov/img/logo/city-of-philadelphia.svg" data-fallback="https://standards.phila.gov/img/logo/city-of-philadelphia.png" alt="City of Philadelphia">
                  </a>
              </div>
              <a href="#page" aria-hidden="false" class="accessible">Skip to main content</a>
              <div class="medium-17 columns show-for-medium desktop-nav">
                <div class="top-bar-right">
                  <nav data-swiftype-index="false">
                    <ul class="horizontal menu pan">
                      <li class="services-menu-link" data-toggle="services-mega-menu">
                        <a href="" class="no-link" data-link="/services/">Services</a>
                      </li>
                      <li>
                        <a href="https://beta.phila.gov/programs/">Programs &amp; initiatives</a>
                      </li>
                      <li>
                        <a href="https://beta.phila.gov/news/"> News &amp; events</a>
                      </li>
                      <li>
                        <a href="https://beta.phila.gov/documents/"> Publications &amp; forms</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div class="search-icon small-5 medium-1 columns phn-m">
                  <button class="site-search" type="button" data-toggle="search-dropdown" aria-label="Search">
                    <i class="fa fa-search fa-2x" aria-hidden="true"></i>
                    <span class="show-for-small-only">Search</span>
                  </button>
              </div>
            </div>
            <div class="top-bar">
              <div class="title-bar small-5 columns" data-responsive-toggle="mobile-nav" data-swiftype-index="false" data-hide-for="medium">
                <button class="menu-icon" type="button" data-toggle>
                  <i class="fa fa-bars fa-3x" aria-hidden="true"></i>
                  <span class="title-bar-title">Menu</span>
                </button>
              </div>
              <!-- Begin mobile navigation -->
              <div class="primary-menu medium-15 medium-push-2 small-24 columns equal valign-mu" id="mobile-nav">
                <div class="top-bar-right valign-mu show-for-small-only">
                  <nav data-swiftype-index="false" class="valign-mu">
                    <ul id="mobile-nav-drilldown" class="vertical menu pan valign-mu">
                      <li>
                        <a href="https://beta.phila.gov"><i class="fa fa-home fa-lg"></i> Phila.gov home</a>
                      </li>
                      <li>
                        <a href="https://beta.phila.gov/services" class="valign-cell"><i class="fa fa-list show-for-small-only"></i> Service directory</a>
                      </li>
                      <li>
                        <a href="https://beta.phila.gov/programs/" class="valign-cell"><i class="fa fa-info-circle"></i> Programs &amp; initiatives</a>
                      </li>
                      <li><a href="https://beta.phila.gov/news/" class="valign-cell"><i class="fa fa-microphone"></i> News &amp; events</a>
                      </li>
                      <li>
                        <a href="https://beta.phila.gov/documents/" class="valign-cell"><i class="fa fa-file-text"></i> Publications &amp; forms</a>
                      </li>
                      <li class="bg-sidewalk">
                        <a href="https://beta.phila.gov/mayor/"><i class="fa fa-university"></i> Mayor's Office</a>
                      </li>
                      <li class="bg-sidewalk"><a href="https://beta.phila.gov/departments/"><i class="fa fa-sitemap"></i> City government directory</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <!-- End mobile navigation-->
            </div>
          </div>
        </div>
      </div>
    </div>

  </header>
</template>
