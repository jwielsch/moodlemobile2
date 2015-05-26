// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

angular.module('mm.core.courses')

.run(function($translate, mmCoursesFrontPage) {
    $translate('mm.courses.frontpage').then(function(value) {
        mmCoursesFrontPage.shortname = value;
        mmCoursesFrontPage.fullname = value;
    });
})

/**
 * Service to handle site courses.
 *
 * @module mm.core.courses
 * @ngdoc service
 * @name $mmCourses
 */
.factory('$mmCourses', function($q, $mmSite, mmCoursesFrontPage) {

    var self = {};

    /**
     * Get user courses.
     *
     * @module mm.core.courses
     * @ngdoc method
     * @name $mmCourses#getUserCourses
     * @param {Boolean} [refresh] True when we should not get the value from the cache.
     * @return {Promise}          Promise to be resolved when the courses are retrieved.
     */
    self.getUserCourses = function(refresh) {
        var userid = $mmSite.getUserId(),
            presets = {},
            data = {userid: userid};

        if (typeof userid === 'undefined') {
            return $q.reject();
        }

        if (refresh) {
            presets.getFromCache = false;
        }

        return $mmSite.read('core_enrol_get_users_courses', data, presets).then(function(courses) {
            // TODO: For now we won't show front page in the course list because we cannot retrieve its summary.
            // courses.unshift(mmCoursesFrontPage);

            // TODO: MM._loadGroups(courses);

            // TODO: Store courses in DB.

            return courses;
        });
    };

    return self;
});
